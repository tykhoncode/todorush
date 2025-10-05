import { app } from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.DATABASE_URL!;

(async () => {
  await connectDB(URI);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
