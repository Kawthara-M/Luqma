import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MealCart from "../components/MealCart"

const Cart = () => {
    let navigate = useNavigate()
  const [mealCarts, setMealCarts] = useState([])

  useEffect(() => {
    const onMount = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setMealCarts(response.data)
      } catch (err) {
        console.log("Failed to add to cart")
      }
    }
    onMount()
  }, [])

  const handleEdit = async (orderId, mealId, mealQuantity) => {
    try {
      mealId = mealId._id
      const response = await axios.put(
        `http://localhost:3010/cart/${orderId}`,
        { mealId, quantity: mealQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      setMealCarts(response.data)
    } catch (err) {
      console.log("Failed to edit meal" + err)
    }
  }

  const handleDelete = async (orderId, mealId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3010/cart/${orderId}/meal/${mealId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      setMealCarts(response.data)
    } catch (err) {
      console.log("Failed to delete meal:" + err)
    }
  }

  const handleCheckout = () => {
    navigate('/Checkout')
  }

  return (
    <div>
      <h2>My Order</h2>
      {mealCarts.map((mealCart) => (
        <MealCart
          key={mealCart.id}
          mealCart={mealCart}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCheckout={handleCheckout}
        />
      ))}
    </div>
  )
}
export default Cart
