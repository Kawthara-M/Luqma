import Meal from "./Meal"
const Menu = ({ meals }) => {
  return (
    <>
    {/* we need container to show all meals */}
      {meals.map((meal) => (
        <Meal meal={meal} />
      ))}
    </>
  )
}
export default Menu
