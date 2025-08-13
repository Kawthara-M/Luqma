import "../../public/styleSheets/meal.css"
import { useState } from "react"

const Meal = ({ meal, handleAddtoCart, customer }) => {
  const [quantity, setQuantity] = useState(1)

  const updateQuantity = (e) => {
    const newValue = parseInt(e.target.value)
    setQuantity(newValue)
  }
  const handleAddClick = () => {
    if (!customer) return 
    handleAddtoCart(meal, quantity)
  }

  return (
    <>
      <div className="meal-container">
        <div className="meal-card">
          <img src={meal.image} alt={meal.name} />
          <h4>{meal.name}</h4>
          <p className="meal-discription">{meal.description}</p>
          <p className="meal-price"> {meal.price.toFixed(2)} BD</p>
          <input
            type="number"
            min="1"
            name="quantity"
            value={quantity}
            onChange={updateQuantity}
          ></input>
          <button onClick={handleAddClick} disabled={!customer}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default Meal
