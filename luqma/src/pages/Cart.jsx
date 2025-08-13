import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MealCart from "../components/MealCart"
import "../../public/styleSheets/cart.css"

const Cart = () => {
  let navigate = useNavigate()
  const [mealCarts, setMealCarts] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const onMount = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setMealCarts(response.data)
      } catch (err) {
        console.error("Failed to add to cart")
      }
    }
    onMount()
  }, [mealCarts])

  const handleEdit = async (orderId, mealId, mealQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:3010/cart/${orderId}`,
        { mealId, quantity: mealQuantity, note: "note" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      setLoad(!load)
    } catch (err) {
      console.error("Failed to edit meal" + err)
    }
  }

  const handleDelete = async (orderId, mealId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3010/cart/${orderId}/meal/${mealId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      setMealCarts(response.data)
      setLoad(!load)
    } catch (err) {
      console.error("Failed to delete meal:" + err)
    }
  }

  const handleCheckout = () => {
    navigate("/Checkout", { state: { mealCarts } })
  }

  return (
    <>
      <div className="wrap-cart">
        {mealCarts.map((mealCart) => (
          <MealCart
            key={mealCart.id}
            mealCart={mealCart}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
        {mealCarts.length > 0 ? (
          mealCarts[0].meals.length > 0 ? (
            <>
            <div className="checkout-container">
              <div className="total-price">
                <h2>Total Price:</h2>
                <p>
                  {mealCarts[0].totalPrice
                    ? mealCarts[0].totalPrice.toFixed(2)
                    : "0.00"}{" "}
                  BD
                </p>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button></div>
            </>
          ) : (
            <>
              <h1 className="empty-cart">Empty Cart!</h1>
              <button
                className="add-btn"
                onClick={() => {
                  navigate("/Home")
                }}
              >
                Add
              </button>
            </>
          )
        ) : (
          <>
            <h1 className="empty-cart">Empty Cart!</h1>
            <button
              className="add-btn"
              onClick={() => {
                navigate("/Home")
              }}
            >
              Add
            </button>
          </>
        )}
      </div>
    </>
  )
}
export default Cart
