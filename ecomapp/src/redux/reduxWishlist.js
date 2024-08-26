import {createSlice} from "@reduxjs/toolkit";
// import { findWishlist } from "./apiCalls";

const wishSlice = createSlice({
    name:"wishlist",
    initialState:{
        favProducts:[],
        isRequesting:false,
        isError:false,
    },
    reducers:{
        addToWishlistStart:(state)=>{
         state.isRequesting = true;
        },
        addToWishlistSuccess:(state,action)=>{
         state.favProducts.push(action.payload);
         console.log("payload: " + action.payload)
         
         state.isRequesting = false;
        },
        addToWsihlistFailure:(state)=>{
         state.isError=true;
        },
        findWishlistStart:(state)=>{
           state.isRequesting =true;
        },
        findWishlistSuccess:(state,action)=>{
           state.favProducts = action?.payload;
           state.isRequesting = false;
        //    console.log("payload: " + action.payload)
        },
        findWishlistFailure:(state)=>{
            state.isError = true
        },
        resetWishlist:(state)=>{
            state.favProducts=[];
        state.isRequesting=false;
        state.isError=false;
        },
        removeWishlistItemStart:(state)=>{
            state.isRequesting =true;
        },
 removeWishlistItemSuccess : (state, action) => {
    console.log('Payload:', action.payload); // Debugging line
    const index = state.favProducts.findIndex((item) => item._id === action.payload._id);
    console.log("indexis: " + index)
    if (index !== -1) {
        state.favProducts.splice(index, 1);
    }
    // state.favProducts = action.payload
    state.isRequesting = false;
},

        removeWishlistItemFailure:(state)=>{
            state.isError = true;
            // console.log(isError)
        }
    }
})



export const {addToWishlistStart,addToWishlistSuccess,addToWsihlistFailure,
              findWishlistStart,findWishlistSuccess,findWishlistFailure,
              resetWishlist,
              removeWishlistItemStart,removeWishlistItemSuccess,removeWishlistItemFailure,
             } = wishSlice.actions;
export default wishSlice.reducer;