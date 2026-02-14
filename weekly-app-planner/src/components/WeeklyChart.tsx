import { type Todo } from "../interfaces/todo";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyChart = ({ todos } : { todos: Todo[] }) => {
  return (
    <div className="chart">
      <h4 className="chart-title">Weekly Overview — 24h Capacity</h4>
      
      <div className="chart-bars">
        {days.map(day => {
          const dayTodos = todos.filter(t => t.day === day);
          const total = dayTodos.reduce((s, t) => s + t.duration, 0);
          const completed = dayTodos.filter(t => t.completed).reduce((s, t) => s + t.duration, 0);

          const totalPct = Math.min((total / 24) * 100, 100);
          const completedPct = total > 0 ? (completed / total) * 100 : 0;
          const available = 24 - total;
          
          // Status indicator
          let status = 'optimal';
          let statusColor = '--success-green';
          if (totalPct >= 90) {
            status = 'maxed';
            statusColor = '--alert-red';
          } else if (totalPct >= 70) {
            status = 'busy';
            statusColor = '--hazard-yellow';
          } else if (totalPct >= 50) {
            status = 'active';
            statusColor = '--electric-cyan';
          }

          return (
            <div key={day} className={`bar bar-${status}`}>
              <span className="bar-label">
                {day.slice(0, 3)}
                <span className="bar-status" style={{ color: `var(${statusColor})` }}>
                  {Math.round(totalPct)}%
                </span>
              </span>
              
              <div className="bar-track">
                <div 
                  className="bar-fill total" 
                  style={{ width: `${totalPct}%` }}
                  data-hours={`${total}h`}
                >
                  <div 
                    className="bar-fill completed" 
                    style={{ width: `${completedPct}%` }}
                  />
                </div>
              </div>
              
              <span className="bar-value">
                {total}h / 24h
                <span className="bar-available">
                  {available}h free
                </span>
              </span>
            </div>
          )
        })}
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot total"></span>
          <span>Planned</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot completed"></span>
          <span>Completed</span>
        </div>
      </div>
      
      <div className="chart-capacity-legend">
        <div className="capacity-item optimal">
          <span className="capacity-indicator"></span>
          <span>0-50% Optimal</span>
        </div>
        <div className="capacity-item active">
          <span className="capacity-indicator"></span>
          <span>50-70% Active</span>
        </div>
        <div className="capacity-item busy">
          <span className="capacity-indicator"></span>
          <span>70-90% Busy</span>
        </div>
        <div className="capacity-item maxed">
          <span className="capacity-indicator"></span>
          <span>90%+ Maxed</span>
        </div>
      </div>
    </div>
  )
}

export default WeeklyChart;