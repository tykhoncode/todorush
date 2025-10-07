import api from "./axios";
import type { Todo } from "../types/todo";

export async function getTodos(): Promise<Todo[]> {
  const { data } = await api.get("/api/todos");
  return data;
}

export async function getTodo(id: string): Promise<Todo> {
  const { data } = await api.get(`/api/todos/${id}`);
  return data;
}

export async function createTodo(title: string): Promise<Todo> {
  const { data } = await api.post("/api/todos", { title });
  return data;
}

export async function toggleTodo(id: string, done: boolean): Promise<Todo> {
  const { data } = await api.patch(`/api/todos/${id}`, { done });
  return data;
}

export async function deleteTodo(id: string): Promise<void> {
  await api.delete(`/api/todos/${id}`);
}

export async function updateTodo(
  id: string,
  body: Partial<Pick<Todo, "title" | "done">>
): Promise<Todo> {
  const { data } = await api.patch(`/api/todos/${id}`, body);
  return data;
}

export async function updateTodoTitle(
  id: string,
  title: string
): Promise<Todo> {
  const { data } = await api.patch(`/api/todos/${id}`, { title });
  return data;
}
