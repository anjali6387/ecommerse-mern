import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFetching:false,
        isError:false,
        newUser:null,
    },
    reducers:{
        //login
        loginStart:(state)=>{
         state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;

            console.log("heeeeeeeeeeeeeeeeeeee")
            console.log("acrion,payloadis:" + action.payload)
        },
        loginFailure:(state)=>{
            state.isError=true;
            state.isFetching=false;
        },

        logoutUser:(state)=>{
        state.currentUser=null;
        state.isFetching=false;
        state.isError=false;

        },
        //register
        newUserStart: (state) => {
            // state.isFetching = true;
            state.isError = false;
          },
          newUserSuccess: (state, action) => {
            state.isFetching = false;
            state.newUser = action.payload ;
          },
          newUserFailure: (state) => {
            state.isFetching = false;
            state.isError = true;
          },
    }
})

export const {loginStart,loginSuccess,loginFailure,logoutUser,
              newUserStart,newUserSuccess,newUserFailure,
             } = userSlice.actions;
export default userSlice.reducer;
