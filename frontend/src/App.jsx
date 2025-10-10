import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import { useSelector } from 'react-redux';
import useGetShop from '../hooks/useGetShop';
import RegisterRestaurant from './pages/RegisterRestaurant';
import useGetShopOrders from '../hooks/useGetShopOrders';
import AddItem from './components/AddItem';
import MyCart from './components/MyCart';
import Checkout from './components/Checkout';
import useGetCurrentPosition from '../hooks/useGetCurrentPositon';
import useGetOrders from '../hooks/useGetOrders';
import MyOrders from './components/MyOrders';

function App() {
  
  useGetOrders();
  useGetCurrentUser();
  useGetCurrentPosition();
  useGetShop();
  useGetShopOrders();
  const {userData}=useSelector(state=>state.user);
  const {shopData}=useSelector(state=>state.shop);

  return (
    <Routes>
      <Route path="/" element={(userData || shopData)?<Home />:<Navigate to={'/signin'}/>} />
      <Route path="/signup" element={!userData?<SignUp />:<Navigate to={'/'}/>} />
      <Route path="/signin" element={!userData?<SignIn />:<Navigate to={'/'}/>} />
      <Route path="/forgotpassword" element={!userData?<ForgotPassword />:<Navigate to={'/'}/>} />
      <Route path="/register-restaurant" element={<RegisterRestaurant/>} />
      <Route path="/additem/" element={<AddItem />} />
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/myorders" element={<MyCart/>} />
      <Route path="/trackorders" element={<MyOrders/>} />
      
    </Routes>
  );
}

export default App;
