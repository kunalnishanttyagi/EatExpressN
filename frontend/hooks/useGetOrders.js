
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOrders } from '../redux/order.slice';
const useGetOrders=async()=>{
    const dispatch=useDispatch();
    try{
        const response=await axios.get("http://localhost:8000/api/order/userorders",{withCredentials:true});
        console.log(response);
        dispatch(setOrders(response.data.orders));

    }
    catch(error){
        console.log(error);
        console.log(error.response);
    }
}

export default useGetOrders;