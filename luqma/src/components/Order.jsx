import { useEffect, useState } from 'react'
import axios from 'axios'

const OrdersPage = () => {
  const [cartOrders, setCartOrders] = useState([])
  const [pastOrders, setPastOrders] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios
      .get('/cart', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log('Cart orders response:', res.data)
        if (res.data && !Array.isArray(res.data)) {
          setCartOrders([res.data])
        } else {
          setCartOrders(res.data)
        }
      })
      .catch((err) => console.error(err))

    axios
      .get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log('Past orders response:', res.data)
        setPastOrders(res.data)
      })
      .catch((err) => console.error(err))
  }, [token])

  return (
    <div className="orders-page">
      <h2>My Current Order</h2>
      {cartOrders.length > 0 ? (
        cartOrders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>{order.restaurant?.name}</h3>
            {/* <p>Status: {order.status}</p> */}
            <p>Delivery Man: {order.deliveryMan?.name}</p>
            <p>Phone: {order.deliveryMan?.phone}</p>
            <p>Email: {order.deliveryMan?.email}</p>
          </div>
        ))
      ) : (
        <p>No current orders.</p>
      )}

      <h2>Past Orders</h2>
      {pastOrders.length > 0 ? (
        pastOrders.map((order) => (
          <div key={order._id} className="past-order-card">
            <h3>{order.restaurant?.name}</h3>
            <p>Status: {order.status}</p>
            <div>
              {order.meals?.map((m) => (
                <p key={m._id}>
                  {m.meal?.name} × {m.quantity}
                </p>
              ))}
            </div>
            <p>Delivery Man: {order.deliveryMan?.name}</p>
          </div>
        ))
      ) : (
        <p>No past orders.</p>
      )}
    </div>
  )
}

export default OrdersPage
