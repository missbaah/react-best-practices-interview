import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const STORAGE_KEY = "todo-app-todos";

if (!localStorage.getItem(STORAGE_KEY)) {
  const seedData = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Walk the dog", completed: true },
    { id: 3, title: "Read a book", completed: false },
    { id: 4, title: "Fix the bug", completed: true },
    { id: 5, title: "Call mom", completed: false },
    { id: 6, title: "Write a blog post", completed: false },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
