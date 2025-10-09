import { createSlice } from "@reduxjs/toolkit";
// import { use } from "react";
// import { useSelector } from "react-redux";
const orderSlice=createSlice({
    name: "orders",
    initialState:{
        orders:null ,
        // city:null
    },
    reducers:{
        setOrders:(state,actions)=>{
            state.orders=actions.payload
        },
        // setCity:(state,actions)=>{
        //     state.city=actions.payload
        // }
    }
});

export const {setOrders} =orderSlice.actions;
export default orderSlice.reducer;