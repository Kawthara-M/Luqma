
import './App.css'
import { useState, useEffect } from 'react'
import Ckechout from './pages/Checkout'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Route, Routes } from 'react-router-dom'
import Restaurant from './pages/Restaurant'
import { CheckSession } from './services/Auth'
import About from './pages/About'

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
  }, [])
  return (
    <>
      <Navbar handleLogOut={handleLogOut}/>

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="auth/sign-up" element={<SignUp />} />
        <Route path="auth/sign-in" element={<SignIn setCustomer={setCustomer} />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/restaurants/:id" element={<Restaurant customer={customer}/>} />
      </Routes>
    </>
  )
}

export default App
