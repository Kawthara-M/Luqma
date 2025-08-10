import { Link } from 'react-router-dom'
import Restaurant from './Restuatant'

const RestaurantsList = ({ restaurants }) => {
  if (!restaurants) return <p>No resturants</p>

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <Link key={restaurant._id} to={`/restaurants/${restaurant._id}`}>
          <div className="restaurant">
            <Restaurant restaurant={restaurant} />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default RestaurantsList
