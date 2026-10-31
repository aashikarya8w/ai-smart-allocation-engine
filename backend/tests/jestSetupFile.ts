import mongoose from "mongoose";

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://localhost:27017/sih25033_test");
    console.log("🔌 Test DB connected via setupFilesAfterEnv");
  }
});
