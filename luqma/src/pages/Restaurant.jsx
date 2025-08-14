import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Menu from '../components/Menu'
import '../../public/styleSheets/meal.css'


const Restaurant = ({ customer }) => {
  const [restaurant, setRestaurant] = useState('')
  const [meals, setMeals] = useState([])
  let { id } = useParams()

  useEffect(() => {

    const getRestaurant = async (req, res) => {
      const response = await axios.get(
        `'https://luqma.onrender.com/restaurants/${id}`
      )
      setRestaurant(response.data)
      const mealsResponse = await axios.get(
        `'https://luqma.onrender.com/restaurants/${id}/menu`
      )

      setMeals(mealsResponse.data)
    }
    getRestaurant()
  }, [])
  return (
    <>
      <div className="restaurant-page">
        <h2 className="restaurant-name-menu">{restaurant.name}</h2>
        {meals.length > 0 ? (
          <Menu meals={meals} customer={customer} />
        ) : (
          <p>No meals available.</p>
        )}
      </div>
    </>
  )
}

export default Restaurant
