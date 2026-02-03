import { useState } from "react"
import { type Todo } from "../interfaces/todo"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

interface Props {
  defaultDay: string
  onClose: () => void
  onSave: (todo: Omit<Todo, "id">) => void
}

const AddTodoModal = ({ defaultDay, onClose, onSave }: Props) => {
  const [form, setForm] = useState<Omit<Todo, "id">>({
    title: "",
    day: defaultDay,
    time: "09:00",
    duration: 1,
    completed: false
  })

  const handleSave = () => {
    if (!form.title.trim()) return
    onSave(form)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>New Task</h3>

        <div className="form-group">
          <label>Task Name</label>
          <input
            placeholder="What do you want to do?"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
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
            min={1}
            value={form.duration}
            onChange={e =>
              setForm({ ...form, duration: Number(e.target.value) })
            }
          />
        </div>

        <div className="actions">
          <button onClick={handleSave}>Add Task</button>
          <button className="danger" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddTodoModal