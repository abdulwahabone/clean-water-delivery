import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

function sqliteUrl() {
  const raw = process.env.DATABASE_URL ?? "file:./data/clean-water.db";
  const filePath = raw.replace(/^file:/, "");
  const abs = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  return `file:${abs}`;
}

const client = createClient({ url: sqliteUrl() });

export const db = drizzle(client, { schema });
