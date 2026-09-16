import "dotenv/config";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "./index";
import { deliveries, sessions, users } from "./schema";

const PASSWORD = "water123";

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  await db.delete(sessions);
  await db.delete(deliveries);
  await db.delete(users);

  await db.insert(users).values([
    {
      id: randomUUID(),
      name: "Aisha Rahman",
      username: "dispatcher",
      passwordHash,
      role: "dispatcher",
    },
    {
      id: randomUUID(),
      name: "Farid Hassan",
      username: "driver",
      passwordHash,
      role: "driver",
    },
  ]);

  await db.insert(deliveries).values([
    {
      id: randomUUID(),
      customer: "Marina Bay Clinic",
      address: "12 Harbour Walk",
      bottles: 8,
      window: "08:00–10:00",
      status: "Out for delivery",
      driver: "Farid Hassan",
    },
    {
      id: randomUUID(),
      customer: "Greenleaf Offices",
      address: "44 Orchard Lane",
      bottles: 12,
      window: "10:00–12:00",
      status: "Queued",
      driver: "Farid Hassan",
    },
    {
      id: randomUUID(),
      customer: "Kampung School",
      address: "9 Jalan Sekolah",
      bottles: 20,
      window: "12:00–14:00",
      status: "Queued",
      driver: "Mei Ling",
    },
    {
      id: randomUUID(),
      customer: "Sunset Cafe",
      address: "3 Beach Road",
      bottles: 6,
      window: "14:00–16:00",
      status: "Delivered",
      driver: "Mei Ling",
    },
  ]);

  console.log("Seeded users:");
  console.log("  dispatcher / water123");
  console.log("  driver / water123");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
