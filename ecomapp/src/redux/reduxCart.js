
import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",

    initialState:{
        cartProducts:[],
        cartQuantity:0,
        totalPay:0,
        isFetching:false,
        isAdding:false,
        isDeleting:false,
        isError:false,
    },

    reducers:{
        // addProduct:(state,action)=>{
        //     state.cartQuantity += 1;
        //     state.cartProducts.push(action.payload);
        //     state.totalPay += action.payload.price * action.payload.quantity;
        // },
        removeProduct:(state,action)=>{
            state.cartQuantity -= 1;
            state.cartProducts.splice(
            state.cartProducts.findIndex((item) => item._id === action.payload._id),1);

            state.totalPay -= action.payload.productPrice * action.payload.productQuantity;
        },

        addToCartStart:(state)=>{
                state.isAdding = true;
        },
        addToCartSuccess:(state,action)=>{
            state.cartQuantity += 1;
            state.cartProducts.push(action.payload);
            // state.totalPay += action.payload.price * action.payload.quantity;
            state.isAdding = false;
        },
        addToCartFailure:(state)=>{
            state.isError = false;
        },
        findUserCartStart:(state)=>{
            state.isFetching=true;
        },
        findUserCartSuccess:(state,action)=>{
            state.isFetching = false;
          state.cartProducts = action.payload
          state.cartQuantity =  state.cartProducts.length

        let sum = 0;
        const totalPrice = ()=>{
            action.payload.forEach((item)=>{
                sum = sum + item.price*item.quantity;  
            })
            return sum; 
        }
        state.totalPay = totalPrice();
        },

        findUserCartFailure:(state)=>{
            state.isError = true;
        },

        deleteCartProductStart:(state)=>{
            state.isDeleting = true;
          
        },
        
        deleteCartProductSuccess(state,action){

            state.cartQuantity -= 1;
            state.cartProducts.splice(
                state.cartProducts.indexOf(action.payload),1);
            // state.totalPay -= action.payload.productPrice * action.payload.productQuantity;
            state.isDeleting = false;

        },
        deleteCartProductFailure(state){
            state.isError=true;
        },

        resetCart:(state)=>{
            state.cartProducts=[];
            state.cartQuantity=0;
            state.totalPay=0;
        }
        


    }
})

export const {addProduct,removeProduct,findUserCartFailure,findUserCartSuccess,findUserCartStart,resetCart,
              addToCartStart,addToCartSuccess,addToCartFailure,
              deleteCartProductStart,deleteCartProductSuccess,deleteCartProductFailure
             } = cartSlice.actions;
export default cartSlice.reducer;