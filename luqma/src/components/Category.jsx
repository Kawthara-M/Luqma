import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function RestaurantFilter() {
  const [cuisines, setCuisines] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCuisineTypes()
    getAllResturantes()
  }, [])

  const getCuisineTypes = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3010/restaurants/cuisines'
      )
      setCuisines(response.data)
    } catch (err) {
      setError('Failed to load cuisines')
    }
  }

  const getAllResturantes = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3010/restaurants')
      setRestaurants(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load restaurants')
      setLoading(false)
    }
  }

  const handleFilterClick = async (cuisineType) => {
    setLoading(true)
    setError(null)
    try {
      if (!cuisineType) {
        await getAllResturantes()
        return
      }
      const response = await axios.get(
        `http://localhost:3010/restaurants/cuisine/${cuisineType}`
      )
      setRestaurants(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load filtered restaurants')
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Categories</h2>
      <div>
        <button onClick={() => handleFilterClick('')}>All</button>

        {cuisines.map((cuisine) => (
          <button key={cuisine} onClick={() => handleFilterClick(cuisine)}>
            {cuisine}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {restaurants.length === 0 && !loading && <p>No restaurants found</p>}
        {restaurants.map((restaurant) => (
          <div key={restaurants._id}>
            <h3>{restaurants.name}</h3>
            <p>Cuisine: {restaurants.cuisineType}</p>
            <p>Phone: {restaurants.phone}</p>
            <p>Address: {restaurants.address}</p>
            <img src={restaurants.image} alt={restaurants.name} />
          </div>
        ))}
      </div>
    </div>
  )
}
