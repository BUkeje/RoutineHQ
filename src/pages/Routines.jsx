function Routines({
  routines,
  onToggleRoutineTask,
  onToggleRoutineComplete,
  onDeleteRoutine,
}) {
  function formatSchedule(days) {
    if (!days || days.length === 0) {
      return "No schedule";
    }

    if (days.length === 7) {
      return "Every day";
    }

    return days.map((day) => day.slice(0, 3)).join(" · ");
  }
  return (
    <main className="routines-page">
      <section className="page-header">
        <div>
          <h1>Routines</h1>
          <p>Manage your routines and track your progress.</p>
        </div>
      </section>

      <section className="routines-list">
        {routines.length === 0 ? (
          <div className="empty-page">
            <h2>No routines yet</h2>
            <p>Create your first routine to get started.</p>
          </div>
        ) : (
          routines.map((routine) => {
            const completedCount = routine.tasks.filter(
              (task) => task.completed,
            ).length;

            const isCompleted = routine.tasks.every((task) => task.completed);

            return (
              <div
                className={`routine-page-card ${
                  isCompleted ? "completed" : ""
                }`}
                key={routine.id}
              >
                <div className="routine-page-header">
                  <div className="routine-page-title">
                    <button
                      className="task-checkbox"
                      onClick={() => onToggleRoutineComplete(routine.id)}
                    >
                      {isCompleted ? "✓" : ""}
                    </button>

                    <div className="routine-title-info">
                      <h2>{routine.name}</h2>

                      <span className="routine-schedule">
                        {formatSchedule(routine.days)}
                      </span>
                    </div>
                  </div>

                  <div className="routine-page-actions">
                    <span className="routine-progress">
                      {completedCount} / {routine.tasks.length}
                    </span>

                    <button
                      className="delete-button"
                      onClick={() => onDeleteRoutine(routine.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="routine-page-tasks">
                  {routine.tasks.map((task) => (
                    <div
                      className={`routine-task ${
                        task.completed ? "completed" : ""
                      }`}
                      key={task.id}
                    >
                      <button
                        className="task-checkbox"
                        onClick={() => onToggleRoutineTask(routine.id, task.id)}
                      >
                        {task.completed ? "✓" : ""}
                      </button>

                      <span className="task-name">{task.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}

export default Routines;
