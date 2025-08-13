import { useState, useEffect } from 'react'
import axios from 'axios'
import Category from '../components/Category'
import RestaurantsList from '../components/RestaurantsList'
import Search from '../components/Search'
import '../../public/styleSheets/home.css'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [searchResults, setSearchResults] = useState([])
  const [searched, toggleSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const getRestaurants = async () => {
      setLoading(true)
      setError(null)
      try {
        let url = 'https://luqma.onrender.com/restaurants'
        if (selectedCategory) {
          url = `https://luqma.onrender.com/restaurants/cuisine/${selectedCategory}`
        }
        const response = await axios.get(url)
        setRestaurants(response.data)
      } catch (err) {
        setError('Failed to load restaurants. Please try again.')
        setRestaurants([])
      } finally {
        setLoading(false)
      }
    }
    getRestaurants()
  }, [selectedCategory])

  const getSearchResults = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(`https://luqma.onrender.com/search`, {
        search: searchQuery,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setSearchResults(response.data)
      toggleSearched(true)
    } catch (err) {
      setError('Search failed. Please try again.')
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    toggleSearched(false)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    if (searched) {
      clearSearch()
    }
  }

  let currentData, currentTitle, currentIcon

  if (searched) {
    currentData = searchResults
    currentTitle = 'Search Results'
    currentIcon = '🔍'
  } else if (selectedCategory) {
    currentData = restaurants
    currentTitle = `${selectedCategory} Restaurants`
    currentIcon = '🏷️'
  } else {
    currentData = restaurants
    currentTitle = 'Featured Restaurants'
    currentIcon = '🍴'
  }

  return (
    <div className="home-container">
      <section className="page-section">
        <h1 className="page-title">🍽️ Discover Amazing Restaurants</h1>
        <p className="page-subtitle">
          Find your perfect dining experience with our curated collection
        </p>
      </section>

      <div className="search-section">
        <div className="search-container">
          <h2 className="search-title">Find Your Next Bite 🥄</h2>
          <Search
            onSubmit={getSearchResults}
            onChange={handleChange}
            value={searchQuery}
          />
        </div>
      </div>

      <div className="main-content">
        <div className="content-area">
          <div className="section-header">
            <h2 className="section-title">
              <span>{currentIcon}</span>
              <span>{currentTitle}</span>
              <span className="results-count">
                {currentData.length}{' '}
                {currentData.length === 1 ? 'restaurant' : 'restaurants'}
              </span>
            </h2>
          </div>

          {searched && (
            <div className="search-results-header">
              <div>
                <span>Showing results for: </span>
                <span className="search-query-display">"{searchQuery}"</span>
              </div>
              <button className="clear-search-btn" onClick={clearSearch}>
                Clear Search
              </button>
            </div>
          )}

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading restaurants...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <div className="error-icon">😔</div>
              <p className="error-message">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="restaurants-grid">
              {currentData.length > 0 ? (
                <RestaurantsList restaurants={currentData} />
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    {searched ? '🔍' : '🍽️'}
                  </div>
                  <p className="empty-state-text">
                    {searched
                      ? 'No restaurants found. Try a different search term.'
                      : 'No restaurants available at the moment.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="sidebar">
          <h3 className="sidebar-title">
            <span>🏷️</span>
            Categories
          </h3>
          <Category
            onSelectCategory={handleCategorySelect}
            selectedCategory={selectedCategory}
            searched={searched}
          />

          <div>
            <h4 className="sidebar-title">
              <span>ℹ️</span>
              Quick Stats
            </h4>
            <div className="status-message info">
              <p>Total Restaurants: {restaurants.length}</p>
              {searched && <p>Search Results: {searchResults.length}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
