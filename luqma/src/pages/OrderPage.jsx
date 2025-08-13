import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../public/styleSheets/order.css'
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
      const response = await axios.get('https://luqma.onrender.com/cart', {
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
      const response = await axios.get('https://luqma.onrender.com/orders', {
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
    <div className="orders-page">
      <h1>Your Orders</h1>

      {error && <p className="error">{error}</p>}

      <section>
        <h2>My Order</h2>
        {loadingCart ? (
          <p>Loading current order...</p>
        ) : cartOrders.length === 0 ? (
          <p>No current order found.</p>
        ) : (
          cartOrders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="restaurant-section">
                <strong>{order.restaurant?.name}</strong>
              </div>
              <div className="delivery-section">
                <div className="icon-text">
                  <i className="fas fa-user">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="M280-200q-50 0-85-35t-35-85H80v-120q0-66 47-113t113-47h160v200h140l140-174v-106H560v-80h120q33 0 56.5 23.5T760-680v134L580-320H400q0 50-35 85t-85 35Zm40-200Zm-40 120q17 0 28.5-11.5T320-320h-80q0 17 11.5 28.5T280-280Zm-80-360v-80h200v80H200Zm560 440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T800-320q0-17-11.5-28.5T760-360q-17 0-28.5 11.5T720-320q0 17 11.5 28.5T760-280ZM160-400h160v-120h-80q-33 0-56.5 23.5T160-440v40Z" />
                    </svg>
                  </i>{' '}
                  {order.deliveryMan?.name}
                </div>
                <div className="icon-text">
                  <i className="fas fa-phone">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="M162-120q-18 0-30-12t-12-30v-162q0-13 9-23.5t23-14.5l138-28q14-2 28.5 2.5T342-374l94 94q38-22 72-48.5t65-57.5q33-32 60.5-66.5T681-524l-97-98q-8-8-11-19t-1-27l26-140q2-13 13-22.5t25-9.5h162q18 0 30 12t12 30q0 125-54.5 247T631-329Q531-229 409-174.5T162-120Zm556-480q17-39 26-79t14-81h-88l-18 94 66 66ZM360-244l-66-66-94 20v88q41-3 81-14t79-28Zm358-356ZM360-244Z" />
                    </svg>
                  </i>{' '}
                  {order.deliveryMan?.phone}
                </div>
                <div className="icon-text">
                  <i className="fas fa-envelope">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="M280-280q-33 0-56.5-23.5T200-360v-400q0-33 23.5-56.5T280-840h560q33 0 56.5 23.5T920-760v400q0 33-23.5 56.5T840-280H280Zm280-188L280-663v303h560v-303L560-468Zm0-98 280-194H280l280 194ZM120-120q-33 0-56.5-23.5T40-200v-500h80v500h660v80H120Zm720-546v-94H280v94-94h560v94Z" />
                    </svg>
                  </i>{' '}
                  {order.deliveryMan?.email}
                </div>
              </div>
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
              <div className="restaurant-section">
                <strong>{order.restaurant?.name}</strong>
              </div>
              <div className="meals-section">
                {order.meals?.map((m) => (
                  <p key={m._id}>
                    {m.meal?.name} × {m.quantity}
                  </p>
                ))}
              </div>
              <div className="delivery-section">
                <div className="icon-text">
                  <i className="fas fa-user">
                    {' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="M280-200q-50 0-85-35t-35-85H80v-120q0-66 47-113t113-47h160v200h140l140-174v-106H560v-80h120q33 0 56.5 23.5T760-680v134L580-320H400q0 50-35 85t-85 35Zm40-200Zm-40 120q17 0 28.5-11.5T320-320h-80q0 17 11.5 28.5T280-280Zm-80-360v-80h200v80H200Zm560 440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T800-320q0-17-11.5-28.5T760-360q-17 0-28.5 11.5T720-320q0 17 11.5 28.5T760-280ZM160-400h160v-120h-80q-33 0-56.5 23.5T160-440v40Z" />
                    </svg>
                  </i>{' '}
                  {order.deliveryMan?.name}
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default OrderPage
