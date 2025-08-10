const Restaurant = ({ restaurant }) => {
  return (
    <>
      {restaurant.image ? (
        <img src={restaurant.image} alt={`${restaurant.name}`} />
      ) : null}

      <h3>
        {restaurant.name}
      </h3>

      <h4>{restaurant.cuisineType} Restaurant</h4>
    </>
  )
}

export default Restaurant
