import { Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="searchbar-container">
      <div className="searchbar-input-group">
      
        <span className="searchbar-icon-left">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="searchbar-input"
        />

        <span className="searchbar-addon-right">12 results</span>
      </div>
    </div>
  )
}
