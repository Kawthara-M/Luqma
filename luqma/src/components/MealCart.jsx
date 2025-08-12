import { useState } from 'react'

const Meal = ({ mealCart, handleEdit, handleDelete, handleCheckout }) => {
  const [quantity, setQuantity] = useState(1)
  const updateQuantity = (e) => {
    const newValue = parseInt(e.target.value)
    setQuantity(newValue)
  }
  return (
    <div>
      {mealCart
        ? mealCart.meals.map((oneMeal) => (
            <>
              <h2>
                {oneMeal.meal.name}
                {oneMeal.quantity}
                {oneMeal.meal.price}
              </h2>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={updateQuantity}
              ></input>
              <button onClick={() => handleEdit(mealCart._id, quantity)}>
                Edit
              </button>
            </>
          ))
        : null}

      <button onClick={() => handleDelete(mealCart._id, quantity)}>
        Delete
      </button>
      <button onClick={() => handleCheckout(mealCart._id, quantity)}>
        Checkout
      </button>
    </div>
  )
}

export default Meal
