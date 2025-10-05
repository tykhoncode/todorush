import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (const c of collections) {
      await c.deleteMany({});
    }
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});
