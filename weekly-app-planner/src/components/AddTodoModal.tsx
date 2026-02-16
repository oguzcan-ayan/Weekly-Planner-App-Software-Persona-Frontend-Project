import { useState, useEffect } from "react";
import { type Todo } from "../interfaces/todo";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Props {
  defaultDay: string
  onClose: () => void
  onSave: (todo: Omit<Todo, "id">) => Promise<void> | void
}

const AddTodoModal = ({ defaultDay, onClose, onSave }: Props) => {
  const [form, setForm] = useState<Omit<Todo, "id">>({
    title: "",
    day: defaultDay,
    time: "09:00",
    duration: 1,
    completed: false
  })
  
  // Local string state for duration input
  const [durationInput, setDurationInput] = useState("1");

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSave = async () => {
    if (!form.title.trim()) return
    // Convert duration string to number before saving
    const duration = Math.max(0.5, parseFloat(durationInput) || 0.5);
    await onSave({ ...form, duration });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>New Task</h3>

        <div className="form-group">
          <label>Task Name</label>
          <input
            placeholder="What do you want to do?"
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
            value={durationInput}
            onChange={e => setDurationInput(e.target.value)}
            placeholder="1"
          />
        </div>

        <div className="actions">
          <button className="btn-primary" onClick={handleSave}>
            Add Task
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTodoModal;