import './App.css'
import { useState } from 'react'
import Ckechout from './pages/Checkout'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

import { Route, Routes } from 'react-router-dom'

function App() {
  const [customer, setCustomer] = useState(null)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn setCustomer={setCustomer} />} />
        <Route path="/Home" element={<Home />} />

        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
