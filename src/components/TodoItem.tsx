import { useState } from "react";

export default function TodoItem({ todo, onDelete, onToggle, onUpdate }: any) {
  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText]: any = useState(todo.title);

  const isCompleted = todo.completed;

  const displayText = todo.title;

  const handleSave = () => {
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 0",
        borderBottom: "1px solid #eee",
        listStyle: "none",
        textDecoration: isCompleted ? "line-through" : "none",
        opacity: isCompleted ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={!!isCompleted}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e: any) => setEditText(e.target.value)}
            style={{ flex: 1, padding: "4px" }}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span style={{ flex: 1 }}>{displayText}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
}
