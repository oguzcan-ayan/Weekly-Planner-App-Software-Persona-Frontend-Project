import { useEffect, useState } from "react";
import { type Todo } from "../interfaces/todo";
import { useTheme } from "../contexts/ThemeContext";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  resetData,
  exportData,
  importData
} from "../services/todoService";

import DayTabs from "../components/DayTabs";
import FilterBar from "../components/FilterBar";
import TodoCard from "../components/TodoCard";
import AddTodoModal from "../components/AddTodoModal";
import EditTodoModal from "../components/EditTodoModal";
import WeeklyChart from "../components/WeeklyChart";

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeDay, setActiveDay] = useState("Monday");
  const [search, setSearch] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  }

  useEffect(() => {
    loadTodos();
  }, [])

  const filtered = todos.filter(t => t.day === activeDay).filter(t => t.title.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a.time.localeCompare(b.time));

  const stats = {
    total: filtered.reduce((sum, t) => sum + t.duration, 0),
    completed: filtered.filter(t => t.completed).reduce((sum, t) => sum + t.duration, 0),
    count: filtered.length,
    completedCount: filtered.filter(t => t.completed).length
  }

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        await importData(event.target?.result as string); 
        loadTodos();
        alert('✓ Import successful');
      } catch {
        alert('✗ Import failed');
      }
    }
    reader.readAsText(file);
    e.target.value = '';
    setShowMenu(false);
  }

  const handleReset = () => {
    if (confirm('Reset all data? This cannot be undone.')) {
      resetData();
      loadTodos();
      setShowMenu(false);
    }
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Weekly App Planner</h1>
          <p>Manage your weekly schedule</p>
        </div>

        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <div className="dropdown">
            <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
              ⋮
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={handleExport}>Export data</button>
                <label className="dropdown-item">
                  Import data
                  <input type="file" accept=".json" onChange={handleImport} hidden />
                </label>
                <button onClick={handleReset} className="danger">Reset all</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Day selector */}
          <DayTabs activeDay={activeDay} onChange={setActiveDay} />

          {/* Controls bar */}
          <div className="controls-row">
            <FilterBar onSearch={setSearch} />

            <div className="stats-pill">
              <strong>{stats.completedCount}/{stats.count}</strong>
              <span>tasks</span>
            </div>

            <div className="stats-pill">
              <strong>{stats.completed}h/{stats.total}h</strong>
              <span>hours</span>
            </div>

            <button className="btn-add" onClick={() => setIsCreating(true)}>
              <span>+</span> New Task
            </button>
          </div>

          {/* Todo cards */}
          <div className="cards-list">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <p>No tasks for {activeDay}</p>
                <button className="btn-secondary" onClick={() => setIsCreating(true)}>
                  Create your first task
                </button>
              </div>
            ) : (
              filtered.map(todo => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onToggle={async (id, completed) => {
                    await updateTodo(id, { completed })
                    loadTodos()
                  }}
                  onEdit={() => setEditingTodo(todo)}
                  onDelete={async (id) => {
                    if (confirm('Delete this task?')) {
                      await deleteTodo(id)
                      loadTodos()
                    }
                  }}
                />
              ))
            )}
          </div>

          {/* Weekly chart */}
          <div className="chart-section">
            <WeeklyChart todos={todos} />
          </div>
        </div>
      </main>

      {/* Modals */}
      {isCreating && (
        <AddTodoModal
          defaultDay={activeDay}
          onClose={() => setIsCreating(false)}
          onSave={async (newTodo) => {
            await addTodo(newTodo)
            setIsCreating(false)
            loadTodos()
          }}
        />
      )}

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={async (updated) => {
            await updateTodo(updated.id, updated)
            setEditingTodo(null)
            loadTodos()
          }}
        />
      )}
    </div>
  )
}

export default Dashboard;