import { configureStore } from "@reduxjs/toolkit";
// import { setUserData } from "./user.slice";
import userSlice from "./user.slice";
import shopSlice from "./shop.slice";
import mapSlice from "./map.slice";
import orderSlice from "./order.slice";
export const store=configureStore({
    reducer:{
        user:userSlice,
        shop:shopSlice,
        map:mapSlice,
        orders:orderSlice
    }
});
// export default store;