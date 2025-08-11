const Search = ({ onSubmit, onChange, value }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          value={value}
          placeholder="Search Restaurants"
          onChange={onChange}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Search
