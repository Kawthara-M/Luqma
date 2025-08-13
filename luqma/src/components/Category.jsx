import { useEffect, useState } from 'react'
import axios from 'axios'

import '../../public/styleSheets/category.css'

const Category = ({ onSelectCategory }) => {
  const [cuisines, setCuisines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCuisines = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          "https://luqma.onrender.com//restaurants/cuisines"
          'http://localhost:3010/restaurants/cuisines'
        )
        setCuisines(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to load cuisines')
      } finally {
        setLoading(false)
      }
    }
    fetchCuisines()
  }, [])

  return (
    <div className="category-container">
      {loading && <p className="category-loading">Loading categories...</p>}
      {error && <p className="category-error">{error}</p>}

      <div className="category-buttons">
    <div>

      <div>
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => onSelectCategory(cuisine)}
            className="category-btn"
          >
            {cuisine}
          </button>
        ))}
        <button
          onClick={() => onSelectCategory(null)}
          className="category-btn show-all-btn"
        >
          Show All Restaurants
        </button>
      </div>
    </div>
    </div>
    </div>
  )
}
export default Category
