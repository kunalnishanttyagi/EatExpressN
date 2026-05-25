import axios from 'axios'
import React, { useEffect } from 'react'
// import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders, setUserData } from '../redux/user.slice'
// import { setMyShopData } from '../redux/ownerSlice'

function useGetMyOrders() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
  const fetchOrders=async () => {
    try {
           const result=await axios.get(`http://localhost:8000/api/order/orders`,{withCredentials:true})
            dispatch(setMyOrders(result.data))
            console.log("orders are",result.data);


    } catch (error) {
        console.log(error)
    }
}
  fetchOrders()

 
  
  },[userData])
}

export default useGetMyOrders
