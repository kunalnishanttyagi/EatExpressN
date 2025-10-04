import { createSlice } from "@reduxjs/toolkit";
// import { use } from "react";
// import { useSelector } from "react-redux";
const shopSlice=createSlice({
    name: "shop",
    initialState:{
        shopData:null ,
        // city:null
    },
    reducers:{
        setShopData:(state,actions)=>{
            state.shopData=actions.payload
        },
        // setCity:(state,actions)=>{
        //     state.city=actions.payload
        // }
    }
});

export const {setShopData} =shopSlice.actions;
export default shopSlice.reducer;