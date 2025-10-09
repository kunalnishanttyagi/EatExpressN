import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice'
import { setAddress } from '../redux/map.slice'
import { setLocation } from '../redux/map.slice'
import { setCity } from '../redux/user.slice'
const useGetCurrentPosition = () => {
  const dispatch=useDispatch();
    useEffect(()=>{

        const fetchPosition=async()=>{
        navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        // const longitude=78.1021124;
        // const latitude=29.3573737
        const longitude = position.coords.longitude;
        console.log(latitude,longitude);
        const geoApi = import.meta.env.VITE_GEO_API;
        // console.log(geoApi);
        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApi}`
          );
          console.log(response);
          // console.log(response.data.results[0].city);
          const cityReceived = response.data.results[0].city;
          const addressReceived=response.data.results[0].formatted;;
          console.log("address is",addressReceived);
          dispatch(setLocation({latitude:latitude,longitude:longitude}));
          dispatch(setCity(cityReceived));
          dispatch(setAddress(addressReceived));
          dispatch(setCity("Ghaziabad"))
        } catch (error) {
          console.log(error);
        }
})
    }
    
fetchPosition();

  },[])
}

export default useGetCurrentPosition;
