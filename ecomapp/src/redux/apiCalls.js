import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, 
         newUserStart,newUserSuccess,newUserFailure,
         logoutUser
        } from "./reduxUser";
import {findUserCartFailure,findUserCartSuccess,findUserCartStart, addToCartStart, addToCartSuccess, addToCartFailure, resetCart } from "./reduxCart";
import { addToWishlistStart, addToWishlistSuccess, addToWsihlistFailure, findWishlistFailure, findWishlistStart, findWishlistSuccess, resetWishlist } from "./reduxWishlist";
import {toast} from 'react-toastify'


// authentication calls 
const notify = (msg) => toast.success(msg, {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  // transition: Bounce,
  });

export const loginUser = async(dispatch,user)=>{
dispatch(loginStart());
try{
    const res = await publicRequest.post("/auth/login",user)
    // console.log(res.data);
    dispatch(loginSuccess(res.data));
    localStorage.setItem("isLogged",true)
    notify('login successFull');
    // window.location.reload();

}catch(err){
    dispatch(loginFailure());
    console.log(err)
}
}

export const registerUser = async(dispatch,newUser)=>{
    dispatch(newUserStart());
    try{
      const res = await publicRequest.post("/auth/register", newUser);
      // console.log(res.data);
      dispatch(newUserSuccess(res.data))
      notify('user registered successfully');
      console.log(res.data);
    }catch(err){
        dispatch(newUserFailure())
        console.log(err)
    }
}


// cart calls 

export const addToCart = async(dispatch,newCart)=>{
      // console.log(newCart.userId)
      dispatch(addToCartStart())
    try{
      const payload = {
        products: {productId:newCart._id,quantity:newCart.quantity,color:newCart.color,size:newCart.size}
      }
      // console.log(payload)
         const res = await userRequest.post(`/carts/${newCart.userId}`,payload);
        dispatch(addToCartSuccess(res.data))
        notify('item added successfully');
    }catch(err){
        dispatch(addToCartFailure())
  // console.log(err)
    }
}

// export const deleteFromCart=async(dispatch,product)=>{
//   dispatch(deleteCartProductStart())
//   try{
//     console.log(product);
//     const payload = {
//       productId:product._id,
//       color:product.color,
//       size:product.size,
//       quantity:product.quantity,
//       // price:product.price
//     }
  
    
//     console.log(payload)
//     const res = await userRequest.delete(`/carts/remove/${product.userId}/${product._id}`,{data:payload});
//     console.log(res.data)
//     dispatch(deleteCartProductSuccess(payload))

//   }catch(err){
//     console.log(err);
//     dispatch(deleteCartProductFailure())
//   }
// }


export const findCart = async(dispatch,userId)=>{
    dispatch(findUserCartStart())
    try{
        const res = await userRequest.get("/carts/find/"+userId);
        console.log(res.data)
        dispatch(findUserCartSuccess(res.data))
        
    }catch(err){
      dispatch( findUserCartFailure())
    console.log(err)
    }
}


//wishlist calls 
// add and update


export const addToWishlist = async(dispatch,newWish)=>{
  dispatch(addToWishlistStart())
try{
  console.log(newWish)
  const payload = {
    products: {productId:newWish._id}
  }
  console.log(payload)
     const res = await userRequest.post("/wishlist",payload);
    //  console.log(res.data)
    dispatch(addToWishlistSuccess(res.data))
    notify('item added successfully');

}catch(err){
    dispatch(addToWsihlistFailure())
    console.log(err)
}
}

// find wishlist
export const findWishlist = async(dispatch,userId)=>{
  dispatch(findWishlistStart())
  try{

    console.log("userwishlist")
      const res = await userRequest.get("/wishlist/find/"+userId);
      console.log(res.data)
     
      dispatch(findWishlistSuccess(res.data))
      
  }catch(err){
    dispatch( findWishlistFailure())
  console.log(err)
  }
}

//remove item 

// export const removeFromWishlist = async(dispatch,removeItem)=>{
//   dispatch(removeWishlistItemStart())
// try{
//   // console.log(removeItem)
//      await userRequest.delete(`/wishlist/remove/${removeItem.userId}/${removeItem._id}`);

//     //  console.log(res.data)
//     // dispatch(removeWishlistItemSucess(res.data))
//     dispatch(removeWishlistItemSucess({ payload: { _id: removeItem._id} }))
//     // findWishlist(dispatch,user.currentUser?._id)

// }catch(err){
//     dispatch(removeWishlistItemFailure())
//     console.log(err)
// }
// }

export const userLogout = async(dispatch)=>{
  
  await userRequest.post("/auth/logout")
   dispatch(logoutUser())
  dispatch(resetCart())
  dispatch(resetWishlist())
  localStorage.setItem("isLogged",false)
}
