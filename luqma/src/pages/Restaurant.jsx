import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
/* import Menu from "./Menu"
import MenuBar from "./MenuBar" */

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState("")
  let { id } = useParams()
  console.log(id)
  useEffect(() => {
    const getRestaurant = async (req, res) => {
      const response = await axios.get(
        `http://localhost:3010/restaurants/${id}`
      )
      setRestaurant(response.data)
    }
    getRestaurant()
  }, [])
  return (
    <>
      <h3>{restaurant.name}</h3>
    </>
  )
}

export default Restaurant
