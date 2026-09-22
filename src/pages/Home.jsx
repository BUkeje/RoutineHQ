import { Link } from "react-router-dom";

function Home({
  tasks,
  routines,
  onToggleTask,
  onToggleRoutineTask,
  onDeleteTask,
  onNewTask,
  onNewRoutine,
}) {
  const completedTasks = tasks.filter((task) => task.completed).length;

  const completedRoutines = routines.filter((routine) =>
    routine.tasks.every((task) => task.completed),
  ).length;

  const totalItems =
    tasks.length +
    routines.reduce((total, routine) => total + routine.tasks.length, 0);

  const completedItems =
    completedTasks +
    routines.reduce(
      (total, routine) =>
        total + routine.tasks.filter((task) => task.completed).length,
      0,
    );

  const dailyProgress =
    totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const currentHour = new Date().getHours();

  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todaysRoutines = routines.filter((routine) =>
    routine.days?.includes(currentDay),
  );

  return (
    <main className="dashboard">
      {/* Greeting */}
      <section className="dashboard-greeting">
        <div>
          <h1>{greeting} 👋</h1>
        </div>

        <div className="dashboard-date">
          <strong>{today}</strong>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">✓</div>

          <div>
            <h2>
              {completedTasks} / {tasks.length}
            </h2>
            <p>Tasks completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">◎</div>

          <div>
            <h2>
              {completedRoutines} / {routines.length}
            </h2>
            <p>Routines completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">▣</div>

          <div>
            <h2>{tasks.length}</h2>
            <p>Total tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pink">↗</div>

          <div>
            <h2>{dailyProgress}%</h2>
            <p>Daily progress</p>
          </div>
        </div>
      </section>

      {/* Routines + Tasks */}
      <section className="dashboard-content">
        {/* Routines */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Today's Routines</h2>

            <Link to="/routines">View all →</Link>
          </div>

          <div className="routine-dashboard-list">
            {todaysRoutines.length === 0 ? (
              <p className="empty-message">No routines scheduled for today.</p>
            ) : (
              todaysRoutines.map((routine) => {
                const completedCount = routine.tasks.filter(
                  (task) => task.completed,
                ).length;

                const progress =
                  routine.tasks.length === 0
                    ? 0
                    : (completedCount / routine.tasks.length) * 100;

                return (
                  <div className="dashboard-routine" key={routine.id}>
                    <div className="dashboard-routine-info">
                      <strong>{routine.name}</strong>

                      <span>
                        {completedCount} / {routine.tasks.length} completed
                      </span>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <Link className="routine-arrow-button" to="/routines">
                      ›
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Tasks */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Today's Tasks</h2>

            <Link to="/tasks">View all →</Link>
          </div>

          <div className="dashboard-task-list">
            {tasks.length === 0 ? (
              <p className="empty-message">No tasks yet.</p>
            ) : (
              tasks.map((task) => (
                <div
                  className={`dashboard-task ${
                    task.completed ? "completed" : ""
                  }`}
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
        </div>
      </section>

      {/* Quick Create */}
      <section className="quick-create-panel">
        <div className="quick-create-header">
          <div className="quick-create-icon">+</div>

          <div>
            <h2>Quick Create</h2>
            <p>Add a new task or routine in seconds.</p>
          </div>
        </div>

        <div className="quick-create-buttons">
          <button className="quick-task-button" onClick={onNewTask}>
            + New Task
          </button>

          <button className="quick-routine-button" onClick={onNewRoutine}>
            + New Routine
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
