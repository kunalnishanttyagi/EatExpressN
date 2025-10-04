import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/user.slice'
const useGetCurrentUser = () => {
  const dispacth=useDispatch();
    useEffect(()=>{
    const fetchUser=async()=>{
      console.log("fetching user in hook ");
        // with credentials true to send cookie
        try{
            const result=await axios.get("http://localhost:8000/api/user/getcurrentuser",{withCredentials:true});
        console.log(result);
        dispacth(setUserData(result.data.user));

    }
    catch(error){
        console.log(error.response);    
    }
}
fetchUser();

  },[])
}

export default useGetCurrentUser;
