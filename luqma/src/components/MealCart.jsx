import { useState } from "react"

const Meal = ({ mealCart, handleEdit, handleDelete, handleCheckout }) => {
  //  const [quantity, setQuantity] = useState(null)
  const [mealsQuantity, setMealsQuantity] = useState(() => {
    const initialState = {}
    mealCart.meals.forEach((meal) => {
      initialState[meal._id] = meal.quantity
    })
    return initialState
  })

  const handleInputChange = (mealId, value) => {
    setMealsQuantity((prev) => ({
      ...prev,
      [mealId]: value,
    }))
  }
  /*   const updateQuantity = (e) => {
    const newValue = parseInt(e.target.value)
    setQuantity(newValue)
  } */
  return (
    <div>
      {mealCart.meals
        ? mealCart.meals.map((oneMeal) => (
            <>
              <h2>Meal:{oneMeal.meal.name} </h2>
              <p>Quantity: {oneMeal.quantity}</p>
              <p>{oneMeal.meal.price} BD</p>

              <input
                type="number"
                name="quantity"
                value={mealsQuantity[oneMeal._id] || ""}
                placeholder={`${oneMeal.quantity}`}
                onChange={(e) => handleInputChange(oneMeal._id, e.target.value)}
              ></input>
              <button
                onClick={() =>
                  handleEdit(
                    mealCart._id,
                    oneMeal.meal._id,
                    mealsQuantity[oneMeal._id]
                  )
                }
              >
                Edit
              </button>
              <button onClick={() => handleDelete(mealCart._id, oneMeal.meal._id)}>
                Delete
              </button>
            </>
          ))
        : null}

     
    </div>
  )
}

export default Meal
