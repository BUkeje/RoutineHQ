import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Routines from "./pages/Routines";
import Tasks from "./pages/Tasks";

function App() {
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showRoutineForm, setShowRoutineForm] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [routines, setRoutines] = useState(() => {
    const savedRoutines = localStorage.getItem("routines");

    return savedRoutines ? JSON.parse(savedRoutines) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
  }, [routines]);

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

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function deleteRoutine(routineId) {
    setRoutines(routines.filter((routine) => routine.id !== routineId));
  }

  function toggleTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function toggleRoutineTask(routineId, taskId) {
    setRoutines(
      routines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              tasks: routine.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      completed: !task.completed,
                    }
                  : task,
              ),
            }
          : routine,
      ),
    );
  }

  function toggleRoutineComplete(routineId) {
    setRoutines(
      routines.map((routine) => {
        if (routine.id !== routineId) {
          return routine;
        }

        const allCompleted = routine.tasks.every((task) => task.completed);

        return {
          ...routine,
          tasks: routine.tasks.map((task) => ({
            ...task,
            completed: !allCompleted,
          })),
        };
      }),
    );
  }

  function openRoutineForm() {
    setShowNewMenu(false);
    setShowRoutineForm(true);
  }

  function closeRoutineForm() {
    setShowRoutineForm(false);
  }

  function addRoutine(routineName, routineTasks) {
    const newRoutine = {
      id: Date.now(),
      name: routineName,
      tasks: routineTasks,
    };

    setRoutines([...routines, newRoutine]);

    setShowRoutineForm(false);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar onNewClick={openNewMenu} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                tasks={tasks}
                routines={routines}
                onToggleTask={toggleTask}
                onToggleRoutineTask={toggleRoutineTask}
                onToggleRoutineComplete={toggleRoutineComplete}
                onDeleteTask={deleteTask}
                onDeleteRoutine={deleteRoutine}
                onNewTask={openTaskForm}
              />
            }
          />
          <Route
            path="/routines"
            element={
              <Routines
                routines={routines}
                onToggleRoutineTask={toggleRoutineTask}
                onToggleRoutineComplete={toggleRoutineComplete}
                onDeleteRoutine={deleteRoutine}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            }
          />
        </Routes>

        {showNewMenu && (
          <div className="modal-overlay">
            <div className="new-modal">
              <h2>Create New</h2>
              <p>What would you like to create?</p>

              <div className="new-options">
                <button className="new-option" onClick={openRoutineForm}>
                  <strong>+ New Routine</strong>
                  <span>Create a repeatable set of tasks.</span>
                </button>

                <button className="new-option" onClick={openTaskForm}>
                  <strong>+ New Task</strong>
                  <span>Create an individual task.</span>
                </button>
              </div>

              <button className="cancel-button" onClick={closeNewMenu}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {showTaskForm && (
          <TaskForm onAddTask={addTask} onCancel={closeTaskForm} />
        )}

        {showRoutineForm && (
          <RoutineForm onAddRoutine={addRoutine} onCancel={closeRoutineForm} />
        )}
      </BrowserRouter>
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
          <label className="form-label">Task Name</label>

          <input
            className="task-input"
            type="text"
            placeholder="e.g. Work on RoutineHQ"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            autoFocus
          />

          <button className="create-task-button" type="submit">
            Create Task
          </button>

          <button className="cancel-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

function RoutineForm({ onAddRoutine, onCancel }) {
  const [routineName, setRoutineName] = useState("");
  const [routineTasks, setRoutineTasks] = useState([""]);

  function handleTaskChange(index, value) {
    const updatedTasks = [...routineTasks];

    updatedTasks[index] = value;

    setRoutineTasks(updatedTasks);
  }

  function addTaskField() {
    setRoutineTasks([...routineTasks, ""]);
  }

  function removeTaskField(index) {
    const updatedTasks = routineTasks.filter(
      (_, taskIndex) => taskIndex !== index,
    );

    setRoutineTasks(updatedTasks);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (routineName.trim() === "") {
      return;
    }

    const validTasks = routineTasks
      .filter((task) => task.trim() !== "")
      .map((task, index) => ({
        id: Date.now() + index,
        name: task.trim(),
        completed: false,
      }));

    if (validTasks.length === 0) {
      return;
    }

    onAddRoutine(routineName.trim(), validTasks);
  }

  return (
    <div className="modal-overlay">
      <div className="new-modal">
        <h2>New Routine</h2>
        <p>Create a routine and add the tasks inside it.</p>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Routine Name</label>

          <input
            className="task-input"
            type="text"
            placeholder="e.g. Morning Routine"
            value={routineName}
            onChange={(event) => setRoutineName(event.target.value)}
            autoFocus
          />

          <label className="form-label">Routine Tasks</label>

          <div className="routine-task-list">
            {routineTasks.map((task, index) => (
              <div className="routine-task-input" key={index}>
                <input
                  className="task-input"
                  type="text"
                  placeholder={`Task ${index + 1}`}
                  value={task}
                  onChange={(event) =>
                    handleTaskChange(index, event.target.value)
                  }
                />

                {routineTasks.length > 1 && (
                  <button
                    className="remove-task-button"
                    type="button"
                    onClick={() => removeTaskField(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            className="add-task-field-button"
            type="button"
            onClick={addTaskField}
          >
            + Add Task
          </button>

          <button className="create-task-button" type="submit">
            Create Routine
          </button>

          <button className="cancel-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
