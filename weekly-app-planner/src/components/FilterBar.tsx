interface Props {
  onSearch: (value: string) => void
}

const FilterBar = ({ onSearch } : Props) => (
  <div className="filter-bar">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
    <input
      type="text"
      placeholder="Search tasks..."
      onChange={e => onSearch(e.target.value)}
    />
  </div>
)

export default FilterBar;