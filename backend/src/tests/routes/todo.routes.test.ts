import request from "supertest";
import { app } from "../../../src/app";
import { Todo } from "../../../src/models/todo.model";

describe("POST /api/todos", () => {
  it("should create a todo and return 201 with the todo object", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ title: "Learn Integration Tests" })
      .expect(201);

    expect(res.body).toMatchObject({
      title: "Learn Integration Tests",
      done: false
    });
    expect(res.body).toHaveProperty("_id");

    const todosInDb = await Todo.find();
    expect(todosInDb).toHaveLength(1);
    expect(todosInDb[0].title).toBe("Learn Integration Tests");
  });

  it("should return 400 if title is missing", async () => {
    const res = await request(app).post("/api/todos").send({}).expect(400);

    expect(res.body).toHaveProperty("error");
  });
});
