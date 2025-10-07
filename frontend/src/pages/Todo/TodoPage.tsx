import { useEffect, useState } from "react";
import type { Todo } from "../../types/todo";
import {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  updateTodo
} from "../../api/todos";
import TodoList from "../../components/TodoList/TodoList";
import styles from "./TodoPage.module.scss";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(title: string) {
    const newTodo = await createTodo(title);
    setTodos((prev) => [...prev, newTodo]);
  }

  async function handleToggle(id: string, done: boolean) {
    const updated = await toggleTodo(id, done);
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  }

  async function handleEdit(id: string, title: string) {
    const updated = await updateTodo(id, { title });
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.todoPage}>
      <h2 className={styles.title}>My Todos</h2>

      <TodoList
        todos={todos}
        onAdd={handleAdd}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
