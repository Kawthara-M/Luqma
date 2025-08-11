import { useState, useEffect } from 'react'
import axios from 'axios'
import Category from '../components/Category'
import RestaurantsList from '../components/RestaurantsList'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

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

  return (
    <div>
      <Category onSelectCategory={setSelectedCategory} />

      {loading && <p>Loading restaurants...</p>}
      {error && <p>{error}</p>}

      <RestaurantsList restaurants={restaurants}  />
    </div>
  )
}

export default Home
