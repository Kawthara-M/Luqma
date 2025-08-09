import './App.css'
import Ckechout from './pages/Checkout'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
