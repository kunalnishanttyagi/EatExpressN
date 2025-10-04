import React, { useEffect } from 'react'
import RegisterShop from './RegisterShop'
import UserNavbar from './UserNavbar'
// import AddItem from './AddItem'
import ItemCard from './ItemCard'
import { useSelector } from 'react-redux'
const Owner = () => {

  const {shopData}=useSelector(state=>state.shop);
  // useEffect(()=>{
  //   axios.get("http://localhost:8000/api/shop/getshop",{withCredentials:true}).then(response=>{
  //     console.log(response.data.shop);
  //     // dispatch(setShopData(response.data.shop));
  //   })
  // })
  useEffect(()=>{
    console.log("try to reload the page if shop is updated");
  },[shopData])
  return (
    <div>
      <UserNavbar/>
      <RegisterShop/>
      {/* <AddItem/> */}
      {
        shopData && shopData.items.length>0 && <div>
          {
            shopData.items.map((item,index)=>{
              return <ItemCard key={index} data={item} />
            })
          }
        </div>
      }
      
    </div>
  )
}

export default Owner
