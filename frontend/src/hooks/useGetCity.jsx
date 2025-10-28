import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import {  setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'

function useGetCity() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
    const apiKey=import.meta.env.VITE_GEOAPIKEY
    useEffect(()=>{
navigator.geolocation.getCurrentPosition(async (position)=>{
    console.log(position)
    const latitude=position.coords.latitude
    const longitude=position.coords.longitude
    // dispatch(setLocation({lat:latitude,lon:longitude}))
    dispatch(setLocation({lat:28.753307,lon:77.4750824}))
    const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
  console.log(result.data)
  dispatch(setCurrentCity("santhli"
    // dispatch(setCurrentCity(result?.data?.results[0].city||result?.data?.results[0].county
))
    // dispatch(setCurrentState(result?.data?.results[0].state))
    dispatch(setCurrentState("Uttar Pradesh"))
    //  dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1 ))
//   dispatch(setAddress(result?.data?.results[0].address_line2))
    dispatch(setAddress("Modinagar, India"))
    dispatch(setCurrentAddress("Modinagar, India"));
})
    },[userData])
}

export default useGetCity
