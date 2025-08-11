import { useEffect, useState } from 'react'
import axios from 'axios'

const OrderPage = () => {
  const [cartOrders, setCartOrders] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  const [loadingCart, setLoadingCart] = useState(false)
  const [loadingPast, setLoadingPast] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token')

  const getCartOrders = async () => {
    setLoadingCart(true)
    try {
      const response = await axios.get('http://localhost:3010/cart', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCartOrders(
        Array.isArray(response.data) ? response.data : [response.data]
      )
    } catch (err) {
      setError('Failed to load cart orders.')
      console.error(err)
    } finally {
      setLoadingCart(false)
    }
  }

  const getPastOrders = async () => {
    setLoadingPast(true)
    try {
      const response = await axios.get('http://localhost:3010/orders', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPastOrders(response.data || [])
    } catch (err) {
      setError('Failed to load past orders.')
      console.error(err)
    } finally {
      setLoadingPast(false)
    }
  }

  useEffect(() => {
    getCartOrders()
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
          cartOrders.map((order) => (
            <div key={order._id} className="order-card">
              <h3>{order.restaurant.name}</h3>
              <p>Status: {order.status}</p>
              <p>Delivery Man: {order.deliveryMan.name}</p>
              <p>Phone: {order.deliveryMan.phone}</p>
              <p>Email: {order.deliveryMan.email}</p>
              <div>
                <h4>Meals:</h4>
                {order.meals?.map((m) => (
                  <p key={m._id}>
                    {m.meal?.name} ----------- {m.meal.price} BD x {m.quantity}
                  </p>
                ))}
              </div>
              <p>Total Price: {order.totalPrice} BD</p>
            </div>
          ))
        )}
      </section>

      <section>
        <h2>Past Orders</h2>
        {loadingPast ? (
          <p>Loading past orders...</p>
        ) : pastOrders.length === 0 ? (
          <p>No past orders yet.</p>
        ) : (
          pastOrders.map((order) => (
            <div key={order._id} className="past-order-card">
              <h3>{order.restaurant?.name || 'Unnamed Restaurant'}</h3>
              <p>Status: {order.status}</p>
              <p>Delivery Man: {order.deliveryMan?.name || 'Not assigned'}</p>
              <div>
                <h4>Meals:</h4>
                {order.meals?.map((m) => (
                  <p key={m._id}>
                    {m.meal?.name} × {m.quantity}
                  </p>
                ))}
              </div>
              <p>Total Price: {order.totalPrice} $</p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default OrderPage
