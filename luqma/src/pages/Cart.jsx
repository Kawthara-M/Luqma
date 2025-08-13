import axios from "axios"
import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MealCart from "../components/MealCart"
import '../../public/styleSheets/cart.css'



const Cart = () => {
  let navigate = useNavigate()
  const [mealCarts, setMealCarts] = useState([])
  const [load, setLoad]=useState(false)

  useEffect(() => {
    const onMount = async () => {
      try {
        const response = await axios.get(`https://luqma.onrender.com/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        console.log("all meal carts: ", response.data)
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
        `https://luqma.onrender.com/cart/${orderId}`,
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
        `https://luqma.onrender.com/cart/${orderId}/meal/${mealId}`,
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
      <button className="checkout-btn" onClick={() => handleCheckout()}>
        Checkout
      </button>
    </div>
  )
}
export default Cart
