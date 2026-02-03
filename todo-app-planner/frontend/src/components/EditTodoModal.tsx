import { type Todo } from "../interfaces/todo"
import { useState } from "react"

interface Props {
  todo: Todo
  onClose: () => void
  onSave: (todo: Todo) => void
}

const EditTodoModal = ({ todo, onClose, onSave }: Props) => {
  const [form, setForm] = useState(todo)

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Edit Task</h3>

        <div className="form-group">
          <label>Task Name</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
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
          <button onClick={() => onSave(form)}>Save</button>
          <button className="danger" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EditTodoModal