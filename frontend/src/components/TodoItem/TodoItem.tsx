import { useEffect, useRef, useState } from "react";
import type { Todo } from "../../types/todo";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => Promise<void> | void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  function startEdit() {
    setDraft(todo.title);
    setIsEditing(true);
  }

  function cancelEdit() {
    setDraft(todo.title);
    setIsEditing(false);
  }

  async function commitEdit() {
    const updatedTitle = draft.trim();
    if (!isEditing) return;
    if (updatedTitle === "" || updatedTitle === todo.title) {
      setIsEditing(false);
      return;
    }
    try {
      setSaving(true);
      await onEdit(todo._id, updatedTitle);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <li className={styles.todoItem}>
      <div className={styles.content}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo._id, !todo.done)}
          disabled={saving}
        />

        {!isEditing ? (
          <button
            onDoubleClick={startEdit}
            onClick={startEdit}
            className={`${styles.title} ${todo.done ? styles.titleDone : ""}`}
            disabled={saving}
          >
            {todo.title}
          </button>
        ) : (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            disabled={saving}
            className={`${styles.input} ${todo.done ? styles.inputDone : ""}`}
          />
        )}
      </div>

      <div className={styles.actions}>
        {!isEditing ? (
          <>
            <button
              onClick={startEdit}
              title="Edit"
              className={styles.editBtn}
              disabled={saving}
            >
              ✐
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className={styles.deleteBtn}
              disabled={saving}
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              onPointerDown={(e) => e.preventDefault()}
              onClick={commitEdit}
              className={styles.saveBtn}
              disabled={saving}
            >
              Save
            </button>
            <button
              onPointerDown={(e) => e.preventDefault()}
              onClick={cancelEdit}
              className={styles.cancelBtn}
              disabled={saving}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
