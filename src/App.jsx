import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const [tasks, setTasks] = useState([]);

  function openNewMenu() {
    setShowNewMenu(true);
  }

  function closeNewMenu() {
    setShowNewMenu(false);
  }

  function openTaskForm() {
    setShowNewMenu(false);
    setShowTaskForm(true);
  }

  function closeTaskForm() {
    setShowTaskForm(false);
  }

  function addTask(taskName) {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setShowTaskForm(false);
  }

  function toggleTask(taskId) {
  setTasks(
    tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}

  return (
    <>
      <Navbar onNewClick={openNewMenu} />

      <Home tasks={tasks} onToggleTask={toggleTask} />

      {showNewMenu && (
        <div className="modal-overlay">
          <div className="new-modal">
            <h2>Create New</h2>
            <p>What would you like to create?</p>

            <div className="new-options">
              <button className="new-option">
                <strong>+ New Routine</strong>
                <span>Create a repeatable set of tasks.</span>
              </button>

              <button
                className="new-option"
                onClick={openTaskForm}
              >
                <strong>+ New Task</strong>
                <span>Create an individual task.</span>
              </button>
            </div>

            <button
              className="cancel-button"
              onClick={closeNewMenu}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showTaskForm && (
        <TaskForm
          onAddTask={addTask}
          onCancel={closeTaskForm}
        />
      )}
    </>
  );
}

function TaskForm({ onAddTask, onCancel }) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (taskName.trim() === "") {
      return;
    }

    onAddTask(taskName.trim());
  }

  return (
    <div className="modal-overlay">
      <div className="new-modal">
        <h2>New Task</h2>
        <p>Add something you need to get done.</p>

        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Task Name
          </label>

          <input
            className="task-input"
            type="text"
            placeholder="e.g. Work on RoutineHQ"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            autoFocus
          />

          <button
            className="create-task-button"
            type="submit"
          >
            Create Task
          </button>

          <button
            className="cancel-button"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;