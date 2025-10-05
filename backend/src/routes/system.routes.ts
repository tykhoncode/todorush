import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

router.get("/ready", (_, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 500).json({
    status: connected ? "ready" : "not ready",
    db: connected ? "connected" : "disconnected"
  });
});

export default router;
