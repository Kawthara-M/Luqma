import axios from 'axios'
import { useEffect, useState } from 'react'
import MealCart from '../components/MealCart'

const Cart = () => {
  const [MealCarts, setMealCarts] = useState([])

  useEffect(() => {
    const onMount = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/cart`)
        setMealCarts(response.data)
      } catch (err) {
        setError('Failed to add to cart')
      }
    }
    onMount()
  }, [])

  return (
    <div>
      <h2>My Order</h2>
      {MealCarts &&
        MealCarts.map((MealCart) => (
          <MealCart
            key={meal.id}
            meal={meal}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCheckout={handleCheckout}
          />
        ))}
    </div>
  )
}
export default Cart
