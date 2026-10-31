import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/sih25033_test");
  const db = mongoose.connection.db!;
  const users = await db.collection("users")
    .find({}, { projection: { email: 1, role: 1 } })
    .limit(20).toArray();
  console.log("Users in test DB:", users.map((u: Record<string,unknown>) => `${u.email} (${u.role})`));
  await mongoose.disconnect();
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
