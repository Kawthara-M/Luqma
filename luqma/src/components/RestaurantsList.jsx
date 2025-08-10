import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Restaurant from "./Restuatant"

const RestaurantsList = ({ }) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const getRestaurants = async () => {
      const response = await axios.get("http://localhost:3010/restaurants")
      setRestaurants(response.data)
    }
    getRestaurants()
  }, [])
  return (
    <>
      <div className="restaurant-list">
        {restaurants
          ? restaurants.map((restaurant) => (
              <Link to={`/restaurants/${restaurant._id}`}>
                <div className="restaurant" key={restaurant._id}>
                  <Restaurant restaurant={restaurant} />
                </div>
              </Link>
            ))
          : null}
      </div>
    </>
  )
}
export default RestaurantsList
