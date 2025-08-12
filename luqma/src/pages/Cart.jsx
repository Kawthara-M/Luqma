import axios from "axios"
import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MealCart from "../components/MealCart"

const Cart = () => {
  let navigate = useNavigate()
  const [mealCarts, setMealCarts] = useState([])
  const [load, setLoad]=useState(false)

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
  }, [load])

  const handleEdit = async (orderId, mealId, mealQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:3010/cart/${orderId}`,
        { mealId, quantity: mealQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      setLoad(!load)
   /*    setMealCarts(Array.isArray(response.data) ? response.data : [response.data]) */
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
    console.log(mealCarts)
    navigate("/Checkout", {state: {mealCarts}})
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
          // handleCheckout={handleCheckout}
        />
      ))}
      <h2>Total Price: {mealCarts.length>0 ? mealCarts[0].totalPrice: 0} BD</h2>
       <button onClick={() => handleCheckout()}>
        Checkout
      </button>
    </div>
  )
}
export default Cart
