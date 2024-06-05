import './SearchBar.css';

function SearchBar({ searchParam, onSearchChange }) {
  return (
    <>
      <input className="search-bar"
             type="text" placeholder="Search..."
             onChange={e => onSearchChange(e.target.value)}
             value={searchParam}
             />
    </>
  );
}

export default SearchBar;