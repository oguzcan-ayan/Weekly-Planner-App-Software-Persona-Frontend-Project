import { type Todo } from "../interfaces/todo"

interface Props {
  todo: Todo
  onDelete: (id: number) => void
  onToggle: (id: number, completed: boolean) => void
  onEdit: () => void
}

const getEndTime = (startTime: string, duration: number): string => {
  const [hours, minutes] = startTime.split(":").map(Number)
  const totalMinutes = hours * 60 + minutes + duration * 60
  const endH = String((totalMinutes / 60) % 24 | 0).padStart(2, "0")
  const endM = String(totalMinutes % 60).padStart(2, "0")
  return `${endH}:${endM}`
}

const TodoCard = ({ todo, onDelete, onToggle, onEdit }: Props) => (
  <div className={`card ${todo.completed ? "done" : ""}`}>
    <div className="card-content">
      <h3>{todo.title}</h3>
      <p>{todo.time} – {getEndTime(todo.time, todo.duration)} · {todo.duration} hour{todo.duration > 1 ? "s" : ""}</p>
    </div>

    <div className="actions">
      <button onClick={onEdit}>Edit</button>
      <button className="success" onClick={() => onToggle(todo.id, !todo.completed)}>
        {todo.completed ? "Undo" : "Done"}
      </button>
      <button className="danger" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  </div>
)

export default TodoCard