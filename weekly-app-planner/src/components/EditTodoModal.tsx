import { useState, useEffect } from "react"
import { type Todo } from "../interfaces/todo"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

interface Props {
  todo: Todo
  onClose: () => void
  onSave: (todo: Todo) => void
}

const EditTodoModal = ({ todo, onClose, onSave } : Props) => {
  const [form, setForm] = useState(todo);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape"){
        onClose();
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSave = () => {
    if (!form.title.trim()) 
      return onSave(form);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Task</h3>

        <div className="form-group">
          <label>Task Name</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Day</label>
          <select
            value={form.day}
            onChange={e => setForm({ ...form, day: e.target.value })}
          >
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Duration (hours)</label>
          <input
            type="number"
            min={0.5}
            step={0.5}
            max={24}
            value={form.duration}
            onChange={e =>
              setForm({ ...form, duration: Number(e.target.value) })
            }
          />
        </div>

        <div className="actions">
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTodoModal;