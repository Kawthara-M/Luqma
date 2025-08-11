import { useEffect, useState } from 'react'
import axios from 'axios'

const Category = ({ onSelectCategory }) => {
  const [cuisines, setCuisines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCuisines = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
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
    <div>
      {loading && <p>Loading categories...</p>}
      {error && <p>{error}</p>}
      <div>
        {cuisines.map((cuisine) => (
          <button key={cuisine} onClick={() => onSelectCategory(cuisine)}>
            {cuisine}
          </button>
        ))}
        <button onClick={() => onSelectCategory(null)}>
          show all restaurants
        </button>
      </div>
    </div>
  )
}

export default Category
