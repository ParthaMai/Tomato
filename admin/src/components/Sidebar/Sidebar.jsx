import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
           { /* here we use also Link and also Navlink */}
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders Items</p>
            </NavLink>
        </div>
    </div>
  )
}

export default sidebar
