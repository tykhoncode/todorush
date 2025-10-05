import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import systemRoutes from "./routes/system.routes";

export const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.use("/", systemRoutes);