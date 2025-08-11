import Order from '../components/Order'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Meal from '../components/Meal'


const Cart = () => {
  const [orders, setOrders] = useState([])
  const [meals, setMeals] = useState([])


  useEffect(() => 
    const onMount = async () => {
      const response = await axios.get(`http://localhost:3010/cart`)
      setOrders(response.data)
      console.log(response.data)
      


      // const theMeals = await axios.get(`http://localhost:3010/meals`)
      // setMeals(theMeals.data)


    onMount()
  }, [])


  if (!orders) return <div>loading...</div>


  return (
    <>
      <div>
        <h2>My Order</h2>
        {
        orders &&
          orders.map((order) => (
            <Meal key={order.id} order={order} meals={meals} />
          ))}
      </div>
    </>
  )
}
export default Cart



