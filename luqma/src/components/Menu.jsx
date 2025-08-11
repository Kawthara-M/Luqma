import { useEffect, useState } from "react"
import Meal from "./Meal"
import axios from "axios"

const Menu = ({ meals, customer }) => {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    console.log("customer is " + customer.id)
    const getCart = async () => {
      try {
        const response = await axios.get("http://localhost:3010/order/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (response.data.length > 0) {
          setCart(response.data[0])
          console.log("order id: " + response.data[0])
        } else {
          setCart(null)
        }
      } catch (error) {
        console.error("Failure in getting cart:", error)
      }
    }

    getCart()
  }, [])

  const handleAddToCart = async (mealId) => {
    try {
      if (!customer) {
        alert("You must be signed in to add to cart.")
        return
      }

      if (cart) {
        console.log("put, cart has an order for this customer")
        const response = await axios.put(
          `http://localhost:3010/order/cart/${cart._id}`,
          { mealId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )

        setCart(response.data)
      } else {
        const response = await axios.post(
          "http://localhost:3010/order/cart",
          {
            meals: {meal:mealId, quantity:1},
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        setCart(response.data)
      }
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  return (
    <div className="menu-container">
      {meals.map((meal) => (
        <Meal
          key={meal._id}
          meal={meal}
          handleAddtoCart={() => handleAddToCart(meal._id)}
        />
      ))}
    </div>
  )
}

export default Menu
