import Meal from "./Meal"
const Menu = ({ meals }) => {
  return (
    <>
      <div className="menu-container">
        {meals.map((meal) => (
          <Meal meal={meal} />
        ))}
      </div>
    </>
  )
}
export default Menu
