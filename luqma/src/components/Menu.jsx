import { useEffect, useState } from "react"
import Meal from "./Meal"
import axios from "axios"
import "../../public/styleSheets/meal.css"

const Menu = ({ meals, customer }) => {
  const [cart, setCart] = useState(null)
  const [showLoginCard, setShowLoginCard] = useState(false)

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get("https://luqma.onrender.com/cart", {
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

  const handleAddToCart = async (meal, mealQuantity) => {
    try {
      const mealId = meal._id
      if (!customer) {
        alert("You must be signed in to add to cart.")

        return
      }

      if (cart) {
        const inCart = await axios.get(`https://luqma.onrender.com/cart/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        // if cart is empty
        if (!inCart.length) {
          // If there are meals
          if (inCart.data[0].meals.length > 0) {
            console.log(
              "There are meals! Proceeding to check if food is from the same res"
            )
            // Grab restaurantId of cart
            const restaurantIdFromCart = inCart.data[0].restaurant._id

            const restaurantIdFromMeal = meal.restaurant
            // Check if meal from restaurant is the same as restaurant in cart
            if (restaurantIdFromCart === restaurantIdFromMeal) {
              console.log("Same restaurant!")
              const response = await axios.put(
                `https://luqma.onrender.com/cart/${cart._id}`,
                { mealId, quantity: mealQuantity },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              // console.log(response.data)
              setCart(response.data)
            } else {
              console.log("you cant add meal from different restaurant")
              return
            }
          } else {
            // No meals ): just add it

            const response = await axios.put(
              `https://luqma.onrender.com/cart/${cart._id}`,
              { mealId, quantity: mealQuantity },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            // console.log(response.data)
            setCart(response.data)
          }
        } else {
          console.log("you cant add meal from different restaurant")
          return
        }
      } else {
        const response = await axios.post(
          "https://luqma.onrender.com/cart",
          {
            meals: { meal: mealId, quantity: parseInt(mealQuantity) },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        console.log(response.data)

        setCart(response.data)
      }
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  return (
    <>
      <h2 className="menu-header">Menu</h2>

      <div className="menu-container">
        {console.log("meals",meals)}
        {meals.length > 0 ? (
          meals.map((meal) => (
            <Meal
              key={meal._id}
              meal={meal}
              handleAddtoCart={(id, qty) => handleAddToCart(meal, qty)}
            />
          ))
        ) : (
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        )}
      </div>
    </>
  )
}

export default Menu
