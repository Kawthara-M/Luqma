import '../../public/styleSheets/restaurantsList.css'

const Restaurant = ({ restaurant }) => {
  return (
    <div className="restaurant-info">
      {restaurant.image ? (
        <img
          src={restaurant.image}
          alt={`${restaurant.name}`}
          className="restaurant-image"
        />
      ) : (
        <div className="restaurant-image-placeholder">No Image</div>
      )}

      <h3 className="restaurant-name">{restaurant.name}</h3>

      <h4 className="restaurant-cuisine">
        {restaurant.cuisineType} Restaurant
      </h4>
    </div>
  )
}

export default Restaurant
