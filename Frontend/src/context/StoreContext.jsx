import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const[cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000";
    const[token,setToken] = useState("");
    // this is for fetch ta food list from mongodb
    const[food_list,setFoodList] = useState([]);

    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){ /* if the product is not available in my cart the this function */
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{ /* available the product into the cart just we want add one extra then this is the function */
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    /* this is the remove from cart item */
    const removeFromCart = async (itemId)=> { 
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }

    /* calculate total ammount for cart */
    const getTotalCartAmount = ()=> {
        let TotalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=> product._id === item);
                TotalAmount += itemInfo.price*cartItems[item];
            } 
        }
        return TotalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    // when we refresh the page cart data is not to be reload
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }
    useEffect(()=>{
        async function laodData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        laodData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems, /* all are function added into context value */
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;