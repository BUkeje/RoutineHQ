function Home({ tasks, onToggleTask }) {
const incompleteTasks = tasks.filter(
  (task) => !task.completed
);

  return (
    <main className="dashboard">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Stay on top of your routines and tasks.</p>
      </section>

      <section className="dashboard-overview">
        <div className="dashboard-card">
          <p className="card-label">ROUTINES</p>
          <h2>3 Active Routines</h2>
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
  <h2>Today's Focus</h2>

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
  </div>
))
    )}
  </div>
</section>

      <section className="quick-create">
        <h2>Quick Create</h2>

        <div className="quick-create-grid">
          <button className="create-card">
            <strong>+ New Routine</strong>
            <span>Build a repeatable set of tasks.</span>
          </button>

          <button className="create-card">
            <strong>+ New Task</strong>
            <span>Add something you need to get done.</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;