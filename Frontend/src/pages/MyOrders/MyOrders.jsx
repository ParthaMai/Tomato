import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const[data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userOrders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() =>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+", ";// means if i only last item we dont need to koma
                            }
                        })}</p>
                        <p>₹{order.amount}.00</p>
                        <p>Items:{order.items.length} </p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>  {/*This hexacode for bullet point */}
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>    
                )
                
            })}
        </div>
      
    </div>
  )
}

export default MyOrders
