import mongoose from "mongoose";
import { env } from "./env";

const MONGO_OPTIONS: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.mongoUri, MONGO_OPTIONS);
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.warn("⚠️  MongoDB connection failed (database offline). Running Express server in resilient mode.");
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected");
});

export function disconnectDatabase(): Promise<void> {
  return mongoose.disconnect();
}
