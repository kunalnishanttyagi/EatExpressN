
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOrders } from '../redux/order.slice';
const useGetShopOrders=async()=>{
    const dispatch=useDispatch();
    try{
        const response=await axios.get("http://localhost:8000/api/order/shoporders",{withCredentials:true});
        console.log("trying to print ans", response.data.orders);
        if(response.data.orders.length>0){
        dispatch(setOrders(response.data.orders));
            console.log("orders saved in the slice are",response.data.orders);
        }
    }
    catch(error){
        console.log(error);
        console.log(error.response);
    }
}

export default useGetShopOrders;