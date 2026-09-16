import { randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { SESSION_COOKIE } from "@/lib/constants";

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export type SafeUser = {
  id: string;
  name: string;
  username: string;
  role: string;
};

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_MS);

  await db.insert(sessions).values({
    id: randomUUID(),
    token,
    userId,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.delete(sessions).where(eq(sessions.token, token));
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = await db.query.sessions.findFirst({
    where: eq(sessions.token, token),
  });
  if (!row) return null;

  if (row.expiresAt < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, row.id));
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, row.userId),
  });
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
  };
}
