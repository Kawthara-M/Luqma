import Search from "./Search"
import { Link } from "react-router"

const Navbar = ({ handleLogout, customer }) => {
  return (
    <>
      <nav className="sideNav">
        <Link to="/Home">home</Link>
        {/* <Link to="/resturants/">Resturants</Link> */}
        <Link to="/orders">Order</Link>
        <Link to={`/profile/:id/`}>Profile</Link>
        <Link to="/about">About Us</Link>
        {
          <Link onClick={handleLogout} to="/auth/sign-in">
            log out
          </Link>
        }
      </nav>
      <nav className="topNav">
        <Link to="/cart">My Cart</Link>
      </nav>
    </>
  )
}
export default Navbar
