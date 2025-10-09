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
import AddItem from './components/AddItem';
import MyCart from './components/MyCart';
import Checkout from './components/Checkout';
import useGetCurrentPosition from '../hooks/useGetCurrentPositon';
import useGetOrders from '../hooks/useGetOrders';

function App() {
  useGetCurrentUser();
  useGetCurrentPosition();
  useGetShop();
  useGetOrders();
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
    </Routes>
  );
}

export default App;
