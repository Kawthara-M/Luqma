import '../../public/styleSheets/cart.css'
import { useState } from 'react'

const MealCart = ({ mealCart, handleEdit, handleDelete, handleCheckout }) => {
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
      [mealId]: value
    }))
  }
  /*   const updateQuantity = (e) => {
    const newValue = parseInt(e.target.value)
    setQuantity(newValue)
  } */
  return (
    <div>
      <h2>My Cart</h2>
      {mealCart.meals
        ? mealCart.meals.map((oneMeal) => (
            <>
              <div className="cart-container">
                <div className="cart-item">
                  <img src={oneMeal.meal.image} alt="" />
                  <div className="cart-right">
                    <p>Meal:{oneMeal.meal.name} </p>
                    <p>Quantity: {oneMeal.quantity}</p>
                    <p>{oneMeal.meal.price} BD</p>
                  </div>

                  <input
                    type="number"
                    name="quantity"
                    value={mealsQuantity[oneMeal._id] || ''}
                    placeholder={`${oneMeal.quantity}`}
                    onChange={(e) =>
                      handleInputChange(oneMeal._id, e.target.value)
                    }
                  ></input>

                  <div className="cart-buttons">
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
                    </div>
                    <button className='delete-button'
                      onClick={() =>
                        handleDelete(mealCart._id, oneMeal.meal._id)
                      }
                    >
                      Delete
                    </button>
                </div>
              </div>
            </>
          ))
        : null}
    </div>
  )
}

export default MealCart
