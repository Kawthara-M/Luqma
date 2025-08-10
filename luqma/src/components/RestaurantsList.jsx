import { useState, useEffect } from "react"
import axios from "axios"
import Restaurant from "./Restuatant"

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const getRestaurants = async () => {
      const response = await axios.get("http://localhost:3010/Home")
      setRestaurants(response.data)
    }
    getRestaurants()
  }, [])
  return (
    <>
      <div className="restaurant-list">
        {restaurants? restaurants.map((restaurant) => (
              <div className="restaurant" key={restaurant._id}>
                <Restaurant restaurant={restaurant} />
              </div>
            ))
          : null}
      </div>
    </>
  )
}
export default RestaurantsList
