function Tasks({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <main className="tasks-page">
      <section className="page-header">
        <div>
          <h1>Tasks</h1>
          <p>Manage your tasks and keep track of what needs to get done.</p>
        </div>
      </section>

      <section className="tasks-list">
        {tasks.length === 0 ? (
          <div className="empty-page">
            <h2>No tasks yet</h2>
            <p>Create your first task to get started.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              className={`task-page-card ${task.completed ? "completed" : ""}`}
              key={task.id}
            >
              <div className="task-page-info">
                <button
                  className="task-checkbox"
                  onClick={() => onToggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className="task-name">{task.name}</span>
              </div>

              <button
                className="delete-button"
                onClick={() => onDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Tasks;
