import mongoose from "mongoose";
export async function connectDB(uri: string) {
  await mongoose.connect(uri);
}
export async function disconnectDB() {
  await mongoose.connection.close();
}
