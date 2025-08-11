import { useEffect, useState } from "react"
import Meal from "./Meal"
import axios from "axios"

const Menu = ({ meals, customer }) => {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get("http://localhost:3010/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (response.data.length > 0) {
          setCart(response.data[0])
        } else {
          setCart(null)
        }
      } catch (error) {
        console.error("Failure in getting cart:", error)
      }
    }

    getCart()
  }, [])

  const handleAddToCart = async (mealId, mealQuantity) => {
    try {
      if (!customer) {
        alert("You must be signed in to add to cart.")
        return
      }

      if (cart) {

        const response = await axios.put(
          `http://localhost:3010/cart/${cart._id}`,
          { mealId, quantity: mealQuantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )

        setCart(response.data)
      } else {
        const response = await axios.post(
          "http://localhost:3010/cart",
          {
            meals: {meal:mealId, quantity:parseInt(mealQuantity)},
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
          handleAddtoCart={(id,qty) => handleAddToCart(meal._id, qty)}
        />
      ))}
    </div>
  )
}

export default Menu
