import Home from "./pages/Home";
import style from "./index.css"
import ItemList from "./pages/ItemList";
import MainItem from "./pages/MainItem";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist"
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findCart, findWishlist } from "./redux/apiCalls";
import { useEffect } from "react";




const  App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
 

console.log(user)

  useEffect(()=>{
    if(user.currentUser !== null){
    findCart(dispatch,user.currentUser?._id)
    findWishlist(dispatch,user.currentUser?._id)
    // window.location.reload()
    }
   },[user])


  return (
    <div>
    
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={user.currentUser ? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={user.currentUser ? <Navigate to="/" /> : <Register />} />
        <Route path="/products/:category" element={<ItemList/>} />
        <Route path="/product/:id" element={<MainItem/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="*" element={<Navigate to ="/" />}/> 

      </Routes>
  
    </div>
 
  )  
};

export default App;
