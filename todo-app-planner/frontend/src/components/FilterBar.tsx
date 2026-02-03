const FilterBar = ({ onSearch }: { onSearch: (v: string) => void }) => (
  <div className="filter-bar">
    <input
      placeholder="Search tasks..."
      onChange={e => onSearch(e.target.value)}
    />
  </div>
)

export default FilterBar