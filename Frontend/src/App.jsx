import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {
  
  const[showLogin,setShowLogin] =  useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} /> {/* Pass the login props */}
        <Routes>
          < Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App
