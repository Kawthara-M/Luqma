const Meal = ({ meal, handleAddtoCart }) => {
  return (
    <div className="meal-card">
      <h4>{meal.name}</h4>
      <p>{meal.description}</p>
      <p className="meal-price">${meal.price.toFixed(2)}</p>
      <button onClick={() => handleAddtoCart(meal._id)}>Add to Cart</button>
    </div>
  )
}

export default Meal
