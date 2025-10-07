import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import systemRoutes from "./routes/system.routes";

export const app = express();

app.use(
  cors({
    origin: ["https://todorush-flame.vercel.app", "http://localhost:5173"]
  })
);

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.use("/", systemRoutes);
