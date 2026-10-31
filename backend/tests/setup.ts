import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/sih25033_test";

export async function connectTestDB(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
}

export async function closeTestDB(): Promise<void> {
  await mongoose.connection.close();
}

export async function clearCollection(name: string): Promise<void> {
  const collection = mongoose.connection.collections[name];
  if (collection) await collection.deleteMany({});
}
