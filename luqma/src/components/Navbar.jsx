import { Link } from "react-router-dom"
import { useState } from "react"
import cartIcon from '../assets/cart.png';

const Navbar = ({ handleLogOut, customer }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      <nav className="topNav">
        <div className="topNav-left">
          <button className="toggleBtn" onClick={toggleMenu}>
            ☰ Menu
          </button>
        </div>
        <div className="topNav-right">
          <Link to="/cart" onClick={closeMenu}>
            <img src={cartIcon} alt="cart icon"></img>
          </Link>
        </div>
      </nav>

      <nav className={`sideNav ${isOpen ? "open" : ""}`}>
        <Link to="/Home" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About Us
        </Link>

        {customer && (
          <>
            <Link to="/orders" onClick={closeMenu}>
              Orders
            </Link>
            <Link to={`/profile/${customer.id}`} onClick={closeMenu}>
              Profile
            </Link>
            <Link
              onClick={() => {
                handleLogOut()
                closeMenu()
              }}
              to="/auth/sign-in"
            >
              Log Out
            </Link>
          </>
        )}

        {!customer && (
          <>
            <Link to="/auth/sign-in" onClick={closeMenu}>
              Sign In
            </Link>
            <Link to="/auth/sign-up" onClick={closeMenu}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </>
  )
}

export default Navbar
