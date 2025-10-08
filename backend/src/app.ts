import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import todoRoutes from "./routes/todo.routes";
import systemRoutes from "./routes/system.routes";
import authRoutes from "./routes/auth.routes";

export const app = express();

app.use(
  cors({
    origin: ["https://todorush-flame.vercel.app", "http://localhost:5173"],
    credentials: true
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/", systemRoutes);
