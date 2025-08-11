import { useState, useEffect } from 'react'
import axios from 'axios'
import Category from '../components/Category'
import RestaurantsList from '../components/RestaurantsList'
import Restaurant from './Restaurant'
import Search from '../components/Search'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [searchResults, setSearchResults] = useState([])
  const [searched, toggleSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // category
  useEffect(() => {
    console.log('Selected category:', selectedCategory)

    const getRestaurants = async () => {
      setLoading(true)
      try {
        let url = 'http://localhost:3010/restaurants'
        if (selectedCategory) {
          url = `http://localhost:3010/restaurants/cuisine/${selectedCategory}`
        }
        const response = await axios.get(url)
        setRestaurants(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to load restaurants')
        setRestaurants([])
      } finally {
        setLoading(false)
      }
    }
    getRestaurants()
  }, [selectedCategory])

  //search
  const getSearchResults = async (e) => {
    e.preventDefault()
    console.log(searchQuery)
    const response = await axios.post(`http://localhost:3010/search`, {
      search: searchQuery,
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    setSearchResults(response.data)
    toggleSearched(true)
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
      <div>
        <h2>Search Results</h2>
        <Search
          onSubmit={getSearchResults}
          onChange={handleChange}
          value={searchQuery}
        />

        {searched ? (
          <section>
            {searchResults.map((restaurant) => (
              <Restaurant
                image={restaurant.image}
                name={restaurant.name}
                cuisine={restaurant.cuisineType}
              />
            ))}
          </section>
        ) : (
          <div>
            <h2>Restaurants</h2>
            <section>
              {restaurants.map((restaurant) => (
                <Restaurant
                  image={restaurant.image}
                  name={restaurant.name}
                  cuisine={restaurant.cuisineType}
                />
              ))}
            </section>
          </div>
        )}
      </div>

      <Category onSelectCategory={setSelectedCategory} />

      {loading && <p>Loading restaurants...</p>}
      {error && <p>{error}</p>}

      <RestaurantsList restaurants={restaurants} />
    </div>
  )
}

export default Home
