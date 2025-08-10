import './App.css'
import { useState, useEffect } from 'react'
import Ckechout from './pages/Checkout'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import RestaurantsList from './components/RestaurantsList'
import { Route, Routes } from 'react-router-dom'
import Restaurant from './components/Restuatant'
import { CheckSession } from './services/Auth'
import About from './pages/About'

function App() {
  const [customer, setCustomer] = useState(null)

  /*   const checkToken = async () => {
    //If a token exists, sends token to localStorage to persist logged in user
    const userData = await CheckSession()
    setUser(userData)
  }

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, []) */
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn setCustomer={setCustomer} />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/Home" element={<RestaurantsList />} />
      </Routes>
    </>
  )
}

export default App
