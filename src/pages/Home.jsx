import { useState } from "react";

function Home({
  tasks,
  routines,
  onToggleTask,
  onToggleRoutineTask,
  onToggleRoutineComplete,
  onDeleteTask,
  onDeleteRoutine,
  onNewTask,
  onNewRoutine,
}) {
  const incompleteTasks = tasks.filter((task) => !task.completed);

  const activeRoutines = routines.filter(
    (routine) => !routine.tasks.every((task) => task.completed),
  );

  const [expandedRoutine, setExpandedRoutine] = useState(null);

  function toggleRoutine(routineId) {
    setExpandedRoutine(expandedRoutine === routineId ? null : routineId);
  }

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Stay on top of your routines and tasks.</p>
      </section>

      <section className="dashboard-overview">
        <div className="dashboard-card">
          <p className="card-label">ROUTINES</p>
          <h2>
            {activeRoutines.length}{" "}
            {activeRoutines.length === 1 ? "Active Routine" : "Active Routines"}
          </h2>
          <button className="card-link">View Routines →</button>
        </div>

        <div className="dashboard-card">
          <p className="card-label">TASKS</p>
          <h2>
            {incompleteTasks.length}{" "}
            {incompleteTasks.length === 1 ? "Task" : "Tasks"} Today
          </h2>
          <button className="card-link">View Tasks →</button>
        </div>
      </section>

      <section className="today-section">
        <h2>Routines / Tasks</h2>

        <h3 className="focus-label">ROUTINES</h3>

        <div className="focus-card">
          {routines.length === 0 ? (
            <div className="empty-tasks">
              No routines yet. Create your first routine.
            </div>
          ) : (
            routines.map((routine) => {
              const completedCount = routine.tasks.filter(
                (task) => task.completed,
              ).length;

              const isRoutineCompleted = routine.tasks.every(
                (task) => task.completed,
              );

              const isExpanded = expandedRoutine === routine.id;

              return (
                <div className="routine-item" key={routine.id}>
                  <div
                    className={`routine-header ${
                      isRoutineCompleted ? "completed" : ""
                    }`}
                  >
                    <button
                      className="task-checkbox routine-checkbox"
                      onClick={() => onToggleRoutineComplete(routine.id)}
                    >
                      {isRoutineCompleted ? "✓" : ""}
                    </button>

                    <button
                      className="routine-expand-button"
                      onClick={() => toggleRoutine(routine.id)}
                    >
                      <div className="routine-title">
                        <span className="routine-arrow">
                          {isExpanded ? "▾" : "▸"}
                        </span>

                        <span>{routine.name}</span>
                      </div>

                      <span className="routine-progress">
                        {completedCount} / {routine.tasks.length}
                      </span>
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => onDeleteRoutine(routine.id)}
                    >
                      Delete
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="routine-tasks">
                      {routine.tasks.map((task) => (
                        <div
                          className={`routine-task ${
                            task.completed ? "completed" : ""
                          }`}
                          key={task.id}
                        >
                          <button
                            className="task-checkbox"
                            onClick={() =>
                              onToggleRoutineTask(routine.id, task.id)
                            }
                          >
                            {task.completed ? "✓" : ""}
                          </button>

                          <span className="task-name">{task.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <h3 className="focus-label">TASKS</h3>

        <div className="focus-card">
          {tasks.length === 0 ? (
            <div className="empty-tasks">
              No tasks yet. Create your first task.
            </div>
          ) : (
            tasks.map((task) => (
              <div
                className={`focus-item ${task.completed ? "completed" : ""}`}
                key={task.id}
              >
                <button
                  className="task-checkbox"
                  onClick={() => onToggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className="task-name">{task.name}</span>

                <button
                  className="delete-button"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="quick-create">
        <h2>Quick Create</h2>

        <div className="quick-create-grid">
          <button className="create-card" onClick={onNewRoutine}>
            <strong>+ New Routine</strong>
            <span>Build a repeatable set of tasks.</span>
          </button>

          <button className="create-card" onClick={onNewTask}>
            <strong>+ New Task</strong>
            <span>Add something you need to get done.</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
