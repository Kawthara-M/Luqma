import Cart from "./Cart"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
const Checkout = () => {
  const [order, setOrder] = useState([])

const navigate = useNavigate()
  useEffect(() => {
    setOrder(Cart)
  }, [])

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
          {order.map((item) => (
            <p key={item.id}>
              {item.name} - ${item.price}
            </p>
          ))}
          <p>total price: ${price}</p>
        </div>
      </div>

      <div>
        <h1>Payment Methods</h1>
        <input type="radio" value="Cash" />
        <input type="radio" value="Apple Pay" />
        <input type="radio" value="Benifit Pay" />
        <input type="radio" value="Cash" />
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
