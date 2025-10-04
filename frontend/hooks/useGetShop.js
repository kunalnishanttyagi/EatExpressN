import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setShopData } from '../redux/shop.slice'
const getShop = () => {
  const dispacth=useDispatch();
    useEffect(()=>{
    const fetchShop=async()=>{
      console.log("fetching user in hook ");
        // with credentials true to send cookie
        try{
            const result=await axios.get("http://localhost:8000/api/shop/getshop",{withCredentials:true});
        console.log(result);
        dispacth(setShopData(result.data.shop));

    }
    catch(error){
        console.log(error.response);    
    }
}
fetchShop();

  },[])
}

export default getShop;
