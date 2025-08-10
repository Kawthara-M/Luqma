import Search from './Search'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <>
      <nav className="sideNav">
        <Link to="/">home</Link>
        <Link to="/resturant">Resturants</Link>
        <Link to="/order">Order</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/about">About Us</Link>
        {/* /* <Link onClick={handleLogout} to="/signin">
          log out
        </Link> */ }
      </nav>
      <nav className="topNav">
        <Link to="/cart">My Cart</Link>
      </nav>
    </>
  )
}
export default Navbar
