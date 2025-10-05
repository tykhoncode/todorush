import request from "supertest";
import { app } from "../app";

describe("Ready endpoint", () => {
    it("should return 200 if MongoDB is connected", async () => {
        const res = await request(app).get("/ready");
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("ready");
        expect(res.body.db).toBe("connected");
    });
});