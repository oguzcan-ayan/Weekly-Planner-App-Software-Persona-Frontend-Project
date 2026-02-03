import { type Todo } from "../interfaces/todo"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const WeeklyChart = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="chart">
      {days.map(day => {
        const total = todos
          .filter(t => t.day === day)
          .reduce((s, t) => s + t.duration, 0)

        const pct = (total / 24) * 100

        return (
          <div key={day} className="bar">
            <span>{day}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="bar-label">{total}h</span>
          </div>
        )
      })}
    </div>
  )
}

export default WeeklyChart