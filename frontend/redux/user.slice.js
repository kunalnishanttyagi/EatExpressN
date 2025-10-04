import { createSlice } from "@reduxjs/toolkit";
// import { use } from "react";
// import { useSelector } from "react-redux";
const userSlice=createSlice({
    name: "user",
    initialState:{
        userData:null ,
        city:null,
        cartItems:[{
            id:null,
            name:null,
            price:null,
            shop:null,
            quantity:null,
            image:null,
            foodType:null,
        }],
        totalAmount:0
    },
    reducers:{
        setUserData:(state,actions)=>{
            state.userData=actions.payload
        },
        setCity:(state,actions)=>{
            state.city=actions.payload
        },
        setCartItems:(state,actions)=>{
            const cartItem=actions.payload;
            const existingItem = state.cartItems.find(i=>i.id===cartItem.id);
            if(existingItem){
                // just add the quamtiy
                existingItem.quantity+=cartItem.quantity;
                
            }
            else
            state.cartItems.push(cartItem);
            state.totalAmount=state.cartItems.reduce((sum,item)=> sum+=(item.price*item.quantity),0)
            
            console.log("cart items in slice are", state.cartItems);
        },
        updateQuantity:(state,actions)=>{
            const {id,quantity}=actions.payload;
            const item=state.cartItems.find(i=>i.id===id);
            if (item) {
            item.quantity = quantity;
            }
            console.log("cart items in slice are", state.cartItems);
            state.totalAmount=state.cartItems.reduce((sum,item)=> sum+=(item.price*item.quantity),0)
        },
        deleteItem:(state,actions)=>{
            const {id}=actions.payload;
            state.cartItems=state.cartItems.filter(i=>i.id!==id);
            // state.cartItems=items;
            console.log("deleted this item",state.cartItems)
            state.totalAmount=state.cartItems.reduce((sum,item)=> sum+=(item.price*item.quantity),0)
        },
        
        
    }
});

export const {setUserData,setCity,setCartItems,updateQuantity,deleteItem} =userSlice.actions;
export default userSlice.reducer;