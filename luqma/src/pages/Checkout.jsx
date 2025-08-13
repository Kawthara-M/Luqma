import Cart from './Cart'
import '../../public/styleSheets/checkout.css'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Checkout = () => {
  const location = useLocation()
  const [order, setOrder] = useState(null)

  const navigate = useNavigate()
  useEffect(() => {
    /* console.log("does state show?" + location.state?.mealCarts[0]) */
    //setOrder(location.state?.mealCarts[0])
  }, [])

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    navigate('/orders')
  }

  const handleSubmitCancleOrder = async (e) => {
    e.preventDefault()
    navigate('/resturant')
  }

  return (
    <>
      <div className="checkout-container">
        <div>
          <h1>Checkout</h1>
          <div>
            {/*   {console.log("order:")}
          {console.log(location.state.mealCarts[0])}
          {console.log("meal:")}
          {console.log(location.state.mealCarts[0].meals[0].meal.name)} */}
            <div className="order-list">
              {location.state.mealCarts[0].meals.map((one) => {
                return (
                  <div key={one.meal._id} className="order-row">
                    <h1>{one.meal.name}</h1>
                    <p>Quantity: {one.quantity}</p>
                    <p>Price: {one.meal.price} BD</p>
                    <p>
                      Meal Total Price:{' '}
                      {parseFloat(one.meal.price) * parseInt(one.quantity)} BD
                    </p>
                  </div>
                )
              })}
              <div className="divider"></div>

              <div className="order-row order-total">
                <p>
                  total price:{' '}
                  {location.state.mealCarts[0].totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h3 className="title">Payment Methods</h3>
            <div className="payment-options">
              <div className="payment-option">
                <input type="radio" value="Cash" />
                <label>Cash</label>
              </div>
              <div className="payment-option">
                <input type="radio" value="Apple Pay" />
                <label>Apple Pay</label>
              </div>
              <div className="payment-option">
                <input type="radio" value="Benifit Pay" />
                <label>Benefit Pay</label>
              </div>
              <div className="payment-option">
                <input type="radio" value="Card" />
                <label>Card</label>
              </div>
            </div>
          </div>

          <div className="checkout">
            <form onSubmit={handleSubmitOrder}>
              <button className="btn-order">Order Now</button>
            </form>

            <form onSubmit={handleSubmitCancleOrder}>
              <button className="btn-Cancle"> Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
