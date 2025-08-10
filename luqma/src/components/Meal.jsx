const Meal = ({ meal }) => {
  return (
    <div className="meal-card">
      <h4>{meal.name}</h4>
      <p>{meal.description}</p>
      <p className="meal-price">${meal.price.toFixed(2)}</p>
    </div>
  )
}

export default Meal
