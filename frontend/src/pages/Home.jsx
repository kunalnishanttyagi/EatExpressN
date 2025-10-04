import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Owner from '../components/Owner';
import User from '../components/User';
import Delivery from '../components/Delivery';

const Home = () => {
  const {userData}=useSelector(state=>state.user);
  return (
    // <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
    //   <div className="w-full max-w-md text-center">
    //     <h1 className="text-5xl font-bold text-red-500 mb-4">Welcome to Vingo</h1>
    //     <p className="text-lg text-gray-600 mb-8">
    //       Discover and order delicious food from the best local stores.
    //     </p>
    //     <div className="flex justify-center gap-4">
    //       <Link 
    //         to="/signup" 
    //         className="bg-red-500 text-white font-bold py-3 px-6 rounded-md hover:bg-red-600 transition-colors duration-300 shadow-sm"
    //       >
    //         Get Started
    //       </Link>
    //       <Link 
    //         to="/signin" 
    //         className="bg-white text-gray-700 font-semibold py-3 px-6 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300 shadow-sm"
    //       >
    //         Sign In
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div>
      {userData.role==="owner" &&<Owner/>}
      {userData.role==="delivery" && <Delivery/>}
      {userData.role==="user" && <User/>}

    </div>
  );
};

export default Home;
