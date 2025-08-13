import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const Checkout = () => {
  const location = useLocation()
  const [order, setOrder] = useState(null)

  const navigate = useNavigate()

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    navigate("/orders")
  }

  const handleSubmitCancleOrder = async (e) => {
    e.preventDefault()
    navigate("/resturant")
  }

  return (
    <>
      <div>
        <h1>Checkout</h1>
        <div>

          {location.state.mealCarts[0].meals.map((one) => {
            return (
              <div key={one.meal._id}>
                <h1>{one.meal.name}</h1>
                <p>Quantity: {one.quantity}</p>
                <p>Price: {one.meal.price} BD</p>
                <p>Meal Total Price: {parseFloat(one.meal.price)*parseInt(one.quantity)} BD</p>
              </div>
            )
          })}
          <p>total price: {location.state.mealCarts[0].totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h1>Payment Methods</h1>
        <div>
        <input type="radio" value="Cash"/> 
        <label>Cash</label>
        </div>
        <div>
        <input type="radio" value="Apple Pay" />
        <label>Apple Pay</label>
        </div>
        <div>
        <input type="radio" value="Benifit Pay" />
        <label>Benefit Pay</label>
        </div>
        <div>
        <input type="radio" value="Card" />
        <label>Card</label>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmitOrder}>
          <button>Order Now</button>
        </form>

        <form onSubmit={handleSubmitCancleOrder}>
          <button>Cancle Order</button>
        </form>
      </div>
    </>
  )
}

export default Checkout
