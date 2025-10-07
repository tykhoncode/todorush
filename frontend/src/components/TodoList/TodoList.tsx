import type { Todo } from "../../types/todo";
import TodoItem from "../TodoItem/TodoItem";
import TodoInputRow from "../TodoInputRow/TodoInputRow";
import styles from "./TodoList.module.scss";

interface TodoListProps {
  todos: Todo[];
  onAdd: (title: string) => void;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void | Promise<void>;
}

export default function TodoList({
  todos,
  onAdd,
  onToggle,
  onDelete,
  onEdit
}: TodoListProps) {
  return (
    <div className={styles.todoList}>
      <ul className={styles.items}>
        {todos.length === 0 ? (
          <></>
        ) : (
          [...todos]
            .sort((a, b) => Number(a.done) - Number(b.done))
            .map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
        )}
      </ul>
      <TodoInputRow onAdd={onAdd} />
    </div>
  );
}
