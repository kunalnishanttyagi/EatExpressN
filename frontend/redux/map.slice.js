import { createSlice } from "@reduxjs/toolkit";

const mapSlice=createSlice({
    name:"map",
    initialState:{
        location:{
        latitude:null,
        longitude:null
    },
    address:null
    },
    reducers:{
        setLocation:(state,actions)=>{
            const {latitude,longitude}=actions.payload
            state.location={
                latitude:latitude,
                longitude:longitude
            }
        },
        setAddress:(state,actions)=>{
            state.address=actions.payload;
        }
    }
    
})


export const {setLocation,setAddress}=mapSlice.actions;
export default mapSlice.reducer;
