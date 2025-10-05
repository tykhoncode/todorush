import { app } from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.DATABASE_URL!;

async function startServer() {
  try {
    await connectDB(URI);
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
