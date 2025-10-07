import { useState } from "react";
import styles from "./TodoInputRow.module.scss";

interface TodoInputRowProps {
  onAdd: (title: string) => void;
}

export default function TodoInputRow({ onAdd }: TodoInputRowProps) {
  const [draft, setDraft] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setDraft("");
  }

  return (
    <form className={styles.inputRow} onSubmit={handleSubmit}>
      <input
        type="text"
        value={draft}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDraft(e.target.value)
        }
        placeholder="Add a task..."
        className={styles.field}
      />
      <button type="submit" className={styles.addButton}>
        Add
      </button>
    </form>
  );
}
