import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";

describe("Ready endpoint", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL!);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return 200 if MongoDB is connected", async () => {
    const res = await request(app).get("/ready");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ready");
    expect(res.body.db).toBe("connected");
  });
});
