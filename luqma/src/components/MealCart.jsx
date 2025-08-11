import { useState } from 'react'

const Meal = ({ meal, handleEdit, handleDelete, handleCheckout }) => {
  const [quantity, setQuantity] = useState(1)

  const updateQuantity = (e) => {
    const newValue = parseInt(e.target.value)
    setQuantity(newValue)
  }

  return (
    <div>
      <h4>{meal.name}</h4>
      <p>{meal.description}</p>
      <p>${meal.price.toFixed(2)}</p>
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={updateQuantity}
      ></input>
      <button onClick={() => handleEdit(meal._id, quantity)}>Edit</button>
      <button onClick={() => handleDelete(meal._id, quantity)}>Delete</button>
      <button onClick={() => handleCheckout(meal._id, quantity)}>Checkout</button>
    </div>
  )
}

export default Meal
