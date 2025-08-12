import axios from 'axios'
import { useEffect, useState } from 'react'
import MealCart from '../components/MealCart'

const Cart = () => {
  const [mealCarts, setMealCarts] = useState([])

  useEffect(() => {
    const onMount = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setMealCarts(response.data)
        //  console.log("mealCarts:"+response.data)
      } catch (err) {
        console.log('Failed to add to cart')
      }
    }
    onMount()
  }, [])

  const handleEdit = async (mealId, mealQuantity) => {
    try {
   const response = await axios.put(
          `http://localhost:3010/cart/${mealId}`,
          { mealId, quantity: mealQuantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
      setMealCarts(response.data)
    } catch (err) {
      console.log('Failed to edit meal'+err)
    }
  }

  const handleDelete = () => {
    return
  }

  const handleCheckout = () => {
    return
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
