import RestaurantsList from './RestaurantsList'

const OrderCard = ({ order }) => {
  return (
    <div>
      <h3>Restaurant: {order.restaurant}</h3>
      <p>Status: {order.status}</p>
      <p>Address: {order.address}</p>
      <p>Total Price: ${order.totalPrice}</p>

      <h4>Meals:</h4>
      {order.meals && order.meals.length > 0 ? (
        <ul>
          {order.meals.map((item) => (
            <li key={item._id}>
              {item.meal} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No meals added.</p>
      )}

      <p>Delivery Man: {order.deliveryMan}</p>
    </div>
  )
}

export default OrderCard
