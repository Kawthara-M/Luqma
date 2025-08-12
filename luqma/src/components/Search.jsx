import '../../public/styleSheets/search.css'

const Search = ({ onSubmit, onChange, value }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <input
        type="text"
        name="search"
        value={value}
        placeholder="Search for a restaurant ...."
        onChange={onChange}
        className="input"
      />
      <button type="submit" className="button">
        🔍
      </button>
    </form>
  )
}

export default Search
