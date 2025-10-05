import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from "../../controllers/todo.controller";
import { Todo } from "../../models/todo.model";
import { Request, Response } from "express";

const mockRequest = (body = {}, params = {}) => ({ body, params }) as Partial<Request>;
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

describe("Todo Controller", () => {
  afterEach(() => jest.clearAllMocks());

  describe("createTodo", () => {
    it("should create a todo and return 201", async () => {
      const req = mockRequest({ title: "Learn Jest" });
      const res = mockResponse();
      const fakeTodo = { _id: "1", title: "Learn Jest", done: false };

      jest.spyOn(Todo, "create").mockResolvedValue(fakeTodo as any);

      await createTodo(req as Request, res as Response);

      expect(Todo.create).toHaveBeenCalledWith({ title: "Learn Jest" });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(fakeTodo);
    });

    it("should return 400 on ValidationError", async () => {
      const req = mockRequest({ title: "" });
      const res = mockResponse();
      const err = { name: "ValidationError", message: "Title required" };

      jest.spyOn(Todo, "create").mockRejectedValue(err);

      await createTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Title required" });
    });

    it("should return 500 on unexpected error", async () => {
      const req = mockRequest({ title: "Crash" });
      const res = mockResponse();

      jest.spyOn(Todo, "create").mockRejectedValue(new Error("DB down"));

      await createTodo(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});