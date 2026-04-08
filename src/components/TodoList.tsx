export default function TodoList({ todos, onDelete, onToggle, onUpdate }: any) {
  if (todos.length === 0) {
    return <p style={{ color: "#999" }}>No todos yet. Add one above!</p>;
  }

  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {todos.map((todo: ToDo, index: number) => (
        <TodoItem
          key={index}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

import { ToDo } from "../App";
import TodoItem from "./TodoItem";
