import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Restaurant from './Restuatant'

const Category = () => {
  const [cuisines, setCuisines] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCuisineTypes()
  }, [])

  const getCuisineTypes = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3010/restaurants/cuisines'
      )
      console.log('Cuisines:', response.data)
      setCuisines(response.data)
    } catch (err) {
      setError('Failed to load cuisines')
      console.error(err)
    }
  }

  const handleFilterClick = async (cuisineType) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(
        `http://localhost:3010/restaurants/cuisine/${cuisineType}`
      )
      setRestaurants(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load filtered restaurants')
      setLoading(false)
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Categories</h2>
      <div>
        {cuisines.length === 0 && !error && <p>Loading categories...</p>}
        {cuisines.length > 0 &&
          cuisines.map((cuisine) => (
            <button key={cuisine} onClick={() => handleFilterClick(cuisine)}>
              {cuisine}
            </button>
          ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <Link key={restaurant._id} to={`/restaurants/${restaurant._id}`}>
            <div>
              <Restaurant restaurant={restaurant} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Category
