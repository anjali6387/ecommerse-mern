import { configureStore,combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./reduxCart"
import userReducer from "./reduxUser"
import wishReducer from "./reduxWishlist"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";

  const persistConfig = {
    key: "root",
    version: 1,
    storage, 
  };

  const rootReducer = combineReducers({ user: userReducer, cart : cartReducer, wishlist : wishReducer, });
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),

})


// export default configureStore({
//   reducer:{
//     cart:cartReducer,
//     user:userReducer,
//     wishlist:wishReducer,
//   }
// })


export let persistor = persistStore(store);