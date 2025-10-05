import mongoose from "mongoose";

export async function connectDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.connection.close();
  console.log("Disconnected from MongoDB");
}
