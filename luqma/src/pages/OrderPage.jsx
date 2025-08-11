import { useEffect, useState } from 'react'
import axios from 'axios'
import OrderCard from '../components/Order'
const OrderPage = () => {
  const [cartOrders, setCartOrders] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  const [loadingCart, setLoadingCart] = useState(false)
  const [loadingPast, setLoadingPast] = useState(false)
  const [error, setError] = useState(null)

  const getOrders = async () => {
    setLoadingCart(true)
    try {
      const response = await axios.get('http://localhost:3010/order/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setCartOrders(response.data)
    } catch (err) {
      setError('Failed to load cart orders.')
    } finally {
      setLoadingCart(false)
    }
  }

  const getPastOrders = async () => {
    setLoadingPast(true)
    try {
      const response = await axios.get('http://localhost:3010/order/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPastOrders(response.data)
    } catch (err) {
      setError('Failed to load past orders.')
    } finally {
      setLoadingPast(false)
    }
  }

  useEffect(() => {
    getOrders()
    getPastOrders()
  }, [])

  return (
    <div>
      <h1>Your Orders</h1>

      {error && <p>{error}</p>}

      <section>
        <h2>Current Cart Order</h2>
        {loadingCart ? (
          <p>Loading current order...</p>
        ) : cartOrders.length === 0 ? (
          <p>No current order found.</p>
        ) : (
          cartOrders.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </section>

      {/* <section>
        <h2>Past Orders</h2>
        {loadingPast ? (
          <p>Loading past orders...</p>
        ) : pastOrders.length === 0 ? (
          <p>No past orders yet.</p>
        ) : (
          pastOrders.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </section> */}
    </div>
  )
}
export default OrderPage
