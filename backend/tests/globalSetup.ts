// globalSetup runs in its own process BEFORE jest workers start.
// setupFiles (jestSetupEnv.ts) only runs inside workers.
// So we must set MONGO_URI here explicitly as well.
process.env.MONGO_URI = "mongodb://localhost:27017/sih25033_test";
process.env.NODE_ENV  = "test";

import mongoose from "mongoose";

export default async function globalSetup(): Promise<void> {
  await mongoose.connect("mongodb://localhost:27017/sih25033_test");
  const db = mongoose.connection.db;
  if (db) {
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      await db.collection(col.name).deleteMany({});
    }
  }
  await mongoose.disconnect();
  console.log("✅ Test DB cleared (sih25033_test)");
}
