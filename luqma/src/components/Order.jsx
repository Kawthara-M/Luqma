import axios from 'axios'
import { useEffect, useState } from 'react'
import Meal from './Meal'

const Order = () => {
  const [orders, setOrders] = useState([])
  const [meals, setMeals] = useState([])

  useEffect(() => {
    const onMount = async () => {
      const response = await axios.get(`http://localhost:3010/orders`)
      setOrders(response.data)

      const theMeals = await axios.get(`http://localhost:3010/meals`)
      setMeals(theMeals.data)
    }

    onMount()
  }, [])

  if (!orders) return <div>loading...</div>

  return (
    <>
      <div>
        <h2>My Order</h2>
        {orders &&
          orders.map((order) => (
            <Meal key={order.id} order={order} meals={meals} />
          ))}
      </div>
    </>
  )
}
export default Order
