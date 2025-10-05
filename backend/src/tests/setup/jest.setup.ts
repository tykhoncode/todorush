import { connectTestDB, closeTestDB } from "./testDB";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

// if dotenv.test is needed later
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.test" });
