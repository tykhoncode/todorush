import request from "supertest";
import { app } from "../app";

describe("Health Check", () => {
  it("should return 200 and correct response", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
