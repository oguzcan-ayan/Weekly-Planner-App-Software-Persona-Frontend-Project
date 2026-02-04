const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface Props {
  activeDay: string
  onChange: (day: string) => void
}

const DayTabs = ({ activeDay, onChange }: Props) => {
  return (
    <div className="day-tabs">
      {days.map(day => (
        <button
          key={day}
          className={day === activeDay ? "active" : ""}
          onClick={() => onChange(day)}
        >
          {day}
        </button>
      ))}
    </div>
  )
}

export default DayTabs