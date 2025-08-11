import './App.css'
import { useState, useEffect } from 'react'
import Ckechout from './pages/Checkout'
import Cart from './pages/Cart'
import Order from './components/Order'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Route, Routes } from 'react-router-dom'
import Restaurant from './pages/Restaurant'
import { CheckSession } from './services/Auth'
import About from './pages/About'
import OrderPage from './pages/OrderPage'

function App() {
  const [customer, setCustomer] = useState(null)

  const checkToken = async () => {
    const userData = await CheckSession()
    setCustomer(userData)
  }

  const handleLogOut = () => {
    setCustomer(null)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }

  }, [customer])
  return (
    <>
      <Navbar handleLogOut={handleLogOut} customer={customer}/>

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route
          path="/auth/sign-in"
          element={<SignIn setCustomer={setCustomer} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/restaurants/:id"
          element={<Restaurant customer={customer} />}
        />
<<<<<<< HEAD
        <Route path="/"/>
        <Route path="/order" element={<OrderPage />} />
=======

        <Route path="/orders" element={<OrderPage />} />
        <Route path="/checkout" element={<Ckechout />} />
        <Route path="/cart" element={<Cart />} />
>>>>>>> 2074f44c9f1a907697401a097e48cd868839690c
      </Routes>
    </>
  )
}

export default App
