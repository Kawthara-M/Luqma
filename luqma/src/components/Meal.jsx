import '../../public/styleSheets/meal.css'
import { useState, useEffect } from "react"

const Meal = ({ meal, handleAddtoCart }) => {
  const [quantity, setQuantity] = useState(1)


  const updateQuantity = (e) => {
  const newValue = parseInt(e.target.value)
  setQuantity(newValue)
}

  return (<>
  <div className="meal-container">
      <div className="meal-card">
      <img src={meal.image} alt="" />
      <h4>{meal.name}</h4>
      <p className='meal-discription'>{meal.description}</p>
      <p className="meal-price">BD {meal.price.toFixed(2)}</p>
      <input type="number" name="quantity" value={quantity} onChange={updateQuantity} ></input>
      <button onClick={() => handleAddtoCart(meal._id, quantity)}>
        Add to Cart
      </button>
      </div>
    </div>
    </>
  )
}

export default Meal
