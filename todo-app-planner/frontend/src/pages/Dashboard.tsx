import { useEffect, useState } from "react"
import { type Todo } from "../interfaces/todo"
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} from "../services/todoService"

import TodoCard from "../components/TodoCard"
import FilterBar from "../components/FilterBar"
import DayTabs from "../components/DayTabs"
import AddTodoModal from "../components/AddTodoModal"
import EditTodoModal from "../components/EditTodoModal"
import WeeklyChart from "../components/WeeklyChart"

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [search, setSearch] = useState("")
  const [activeDay, setActiveDay] = useState("Monday")
  const [editing, setEditing] = useState<Todo | null>(null)
  const [adding, setAdding] = useState(false)

  const loadTodos = async () => {
    setTodos(await getTodos())
  }

  useEffect(() => {
    loadTodos()
  }, [])

  const filtered = todos
    .filter(t => t.day === activeDay)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.time.localeCompare(b.time))

  const totalHours = filtered.reduce((sum, t) => sum + t.duration, 0)
  const totalWorked = filtered
    .filter(t => t.completed)
    .reduce((sum, t) => sum + t.duration, 0)

  return (
    <div className="dashboard-wrapper">

      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>My Dashboard</h1>
          <p>Manage your weekly schedule</p>
        </div>
        <button className="btn-add" onClick={() => setAdding(true)}>
          <span>+</span> New Task
        </button>
      </div>

      {/* Day Tabs */}
      <DayTabs activeDay={activeDay} onChange={setActiveDay} />

      {/* Filter + Stats Row */}
      <div className="controls-row">
        <FilterBar onSearch={setSearch} />
        <div className="stats-pill">
          Worked: <strong>{totalWorked}h</strong>
        </div>
        <div className="stats-pill">
          Total: <strong>{totalHours}h</strong>
        </div>
      </div>

      {/* Todo Cards */}
      <div className="cards-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No tasks for {activeDay}. Add one!</p>
          </div>
        ) : (
          filtered.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={async id => {
                await deleteTodo(id)
                loadTodos()
              }}
              onToggle={async (id, completed) => {
                await updateTodo(id, { completed })
                loadTodos()
              }}
              onEdit={() => setEditing(todo)}
            />
          ))
        )}
      </div>

      {/* Weekly Chart */}
      <div className="chart-section">
        <h4>Weekly Overview</h4>
        <WeeklyChart todos={todos} />
      </div>

      {/* Add Modal */}
      {adding && (
        <AddTodoModal
          defaultDay={activeDay}
          onClose={() => setAdding(false)}
          onSave={async newTodo => {
            await addTodo(newTodo)
            setAdding(false)
            loadTodos()
          }}
        />
      )}

      {/* Edit Modal */}
      {editing && (
        <EditTodoModal
          todo={editing}
          onClose={() => setEditing(null)}
          onSave={async updated => {
            await updateTodo(updated.id, updated)
            setEditing(null)
            loadTodos()
          }}
        />
      )}
    </div>
  )
}

export default Dashboard