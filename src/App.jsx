
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: task, done: false }
    ]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <p>Organize your day, one task at a time!</p>

      <form onSubmit={addTask}>
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span
              onClick={() => toggleTask(t.id)}
              className={t.done ? "done" : ""}
            >
              {t.done ? "✓ " : "○ "}{t.text}
            </span>
            <button onClick={() => deleteTask(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p>
        Completed: {tasks.filter(t => t.done).length}
        {" / "}{tasks.length}
      </p>
    </div>
  );
}

export default App;
