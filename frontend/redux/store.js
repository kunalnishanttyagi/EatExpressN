import { configureStore } from "@reduxjs/toolkit";
// import { setUserData } from "./user.slice";
import userSlice from "./user.slice";
import shopSlice from "./shop.slice";
export const store=configureStore({
    reducer:{
        user:userSlice,
        shop:shopSlice,
    }
});
// export default store;