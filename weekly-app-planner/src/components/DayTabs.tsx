const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

interface Props {
  activeDay: string
  onChange: (day: string) => void
}

const DayTabs = ({ activeDay, onChange } : Props) => {
  return (
    <div className="day-tabs">
      {days.map(day => (
        <button
          key={day}
          className={`day-tab ${day === activeDay ? "active" : ""}`}
          onClick={() => onChange(day)}
          data-day={day.slice(0, 3).toUpperCase()}
        >
          <span>{day}</span>
        </button>
      ))}
    </div>
  )
}

export default DayTabs;