import { useState, useEffect } from "react";
import { todos as globalTodos, syncTodos, idCounter } from "./globals";
import { loadFromStorage, saveToStorage } from "./storage";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

export type ToDo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: Date;
};

let editingId: number | null = null;
let todoCount: number = 0;

function App() {
  const [todos, setTodos]: [
    ToDo[],
    React.Dispatch<React.SetStateAction<ToDo[]>>,
  ] = useState([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const stored: ToDo[] = loadFromStorage();
    setTodos(stored);
    syncTodos(stored);
    todoCount = stored.length;
  }, []);

  const addTodo = (text: any) => {
    const newTodo: any = {
      id: Date.now(),
      title: text,
      completed: false,
      createdAt: new Date(),
    };

    todos.push(newTodo);
    syncTodos(todos);
    todoCount++;
    setTodos([...todos]);
    saveToStorage(todos);
  };

  const deleteTodo = (id: number) => {
    const updated = todos.filter((t: ToDo) => t.id !== id);
    setTodos(updated);
    saveToStorage(updated);
  };

  const toggleTodo = (id: number) => {
    todos.forEach((t: any) => {
      if (t.id == id) {
        t.completed = !t.completed;
      }
    });
    setTodos([...todos]);
    saveToStorage(todos);
  };

  const updateTodo = (id: number, text: string) => {
    const todo = todos.find((t: any) => t.id == id);
    todo.title = text;
    editingId = null;
    setTodos([...todos]);
    saveToStorage(todos);
  };

  const getFilteredTodos = () => {
    let result = todos;

    if (searchQuery) {
      return todos.filter((t: ToDo) => t.title.includes(searchQuery));
    }

    if (filter === "active") {
      return result.filter((t: ToDo) => !t.completed);
    } else if (filter === "completed") {
      return result.filter((t: ToDo) => t.completed);
    }
    return result;
  };

  const completedCount = todos.filter((t: ToDo) => t.completed === true).length;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Search todos..."
        value={searchQuery}
        onChange={(e: any) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          boxSizing: "border-box",
        }}
      />

      <AddTodo onAdd={addTodo} />

      {/* use dry */}
      <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
        {[
          { value: "all" as const, label: "All" },
          { value: "active" as const, label: "Active" },
          { value: "completed" as const, label: "Completed" },
        ].map((option) => (
          <button key={option.value} onClick={() => setFilter(option.value)}>
            {option.label}
          </button>
        ))}
      </div>

      <TodoList
        todos={getFilteredTodos()}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
      />

      <div
        style={{
          marginTop: "16px",
          color: "#666",
          fontSize: "14px",
          display: "flex",
          gap: "16px",
        }}
      >
        <span>Total (global): {globalTodos.length}</span>
        <span>Completed: {completedCount}</span>
        <span>Count (module var): {todoCount}</span>
        <span>Next id: {idCounter}</span>
      </div>
    </div>
  );
}

export default App;
