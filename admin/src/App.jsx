import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import Order from './pages/Orders/Order'
import List from './pages/List/List'
  import { ToastContainer} from 'react-toastify'; // this is add a notification when success fully add item

const App = () => {

  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer /> // this is add a notification when success fully add item
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url}/>} />
          <Route path='/orders' element={<Order url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
