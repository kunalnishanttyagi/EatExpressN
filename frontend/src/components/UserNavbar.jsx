"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../../redux/user.slice";
import { setUserData } from "../../redux/user.slice";
// --- SVG Icons ---
import { IoMdAdd } from "react-icons/io";
import { CiReceipt } from "react-icons/ci";

import { IoMdSearch } from "react-icons/io";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LocationIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);

const CartIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.823-6.441a.75.75 0 00-.693-1.03H6.086a.75.75 0 00-.732.539L4.5 7.5M7.5 14.25h11.218a.75.75 0 00.732-.539l1.823-6.441a.75.75 0 00-.693-1.03H6.086a.75.75 0 00-.732.539L4.5 7.5m0 0l-.242-1.05a1.125 1.125 0 00-1.087-.835H2.25m5.25 9.75A3 3 0 1110.5 18a3 3 0 01-3-3m9.75 3a3 3 0 11-3-3 3 3 0 013 3z"
    />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Main Navbar Component ---

const Navbar = () => {
  // { city = "Jhansi", userInitial = "A" }
  // const city="Jhashi"
  const navigate=useNavigate();
  const {cartItems}=useSelector(state=>state.user);
  const { userData, city } = useSelector((state) => state.user);
  const userInitial = userData?.fullName[0];
  // console.log(userData.fullName[0]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const profileRef = useRef(null);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    console.log("Attempting to log out...");
    try {
      const dataa = await axios.post(
        "http://localhost:8000/api/auth/logout", // Your backend endpoint
        {},
        { withCredentials: true }
      );
      console.log(dataa);
      console.log("Successfully logged out from server.");
      dispatch(setUserData(null));
      dispatch(setCity(null));
      navigate("/signin");
      
      // onLogout(); // Call the parent component's logout logic
    } catch (err) {
      console.error("Logout failed:", err);
      // Fallback: still trigger logout on the client-side
      // onLogout();
    } finally {
      setIsProfileOpen(false);
    }
  };
  useEffect(() => {
    const fetchCity = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log(latitude,longitude);
        const geoApi = import.meta.env.VITE_GEO_API;
        // console.log(geoApi);
        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoApi}`
          );
          console.log(response);
          // console.log(response.data.results[0].city);
          const cityReceived = response.data.results[0].city;
          dispatch(setCity(cityReceived));
          dispatch(setCity("Ghaziabad"))
        } catch (error) {
          console.log(error);
        }
      });
    };
    fetchCity();
  }, [city]);

  // Close profile pop-up when clicking outside
  // useEffect(() => {
  //     const handleClickOutside = (event) => {
  //         if (profileRef.current && !profileRef.current.contains(event.target)) {
  //             setIsProfileOpen(false);
  //         }
  //     };
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //         document.removeEventListener("mousedown", handleClickOutside);
  //     };
  // }, []);

  return (
    <header className="bg-[#FFF7F6] font-sans relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Left Side: Logo */}
          <h1 className="text-3xl font-bold text-red-500">EatExpress</h1>

          {/* Middle & Right Side: Main control panel (Desktop) */}
          <div className="hidden md:flex flex-grow items-center justify-center ml-8">
            <div className="flex items-center bg-white rounded-xl shadow-md h-12 w-full justify-between max-w-2xl">
              {/* Location */}
              <div className="flex items-center pl-4 pr-3 border-r border-gray-200 h-full">
                <LocationIcon className="text-red-500" />
                <span className="ml-2 text-gray-800 font-semibold text-sm whitespace-nowrap">
                  {city}
                </span>
              </div>
              {
                // --- SVG Icons ---
                // import { IoMdAdd } from "react-icons/io";
                // import { CiReceipt } from "react-icons/ci";

                userData.role === "owner" && (
                  <div className=" relative flex items-center justify-around w-full mx-3">
                    <a href="/additem" className=" p-2 text-[14px] bg-amber-100 rounded-4xl flex text-orange-400 gap-1 items-center justify-center">
                        <IoMdAdd size={21} className=" " />
                      <h2>Add Food Item</h2>
                    </a>
                    <div className=" p-2 text-[14px] bg-amber-100 rounded-4xl flex text-orange-400 gap-1 items-center justify-center">
                        <CiReceipt size={21} className=" " />
                      <h2 className="" >My orders</h2>
                      <div className=" absolute text-[12px] w-5 flex justify-center items-center h-5 p-2 -top-2 text-white right-12 bg-red-500 rounded-full" >

                      {/* <span className="" >{cartItems.length}</span> */}
                      <span className="" >0</span>
                      </div>
                    </div>
                  </div>
                  
                )
              }

              

              {/* Search Input */}
              {userData.role === "user" && (
                <div className=" flex relative items-center w-full justify-between mx-5 h-full">
                  <input
                    type="text"
                    placeholder="Search delicious food..."
                    className="h-full  bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                  />
                  <IoMdSearch size={21} className=" " />
                </div>
              )}
              {/* My Orders Button */}
              {userData.role === "user" && (
                <Link to={"/myorders"} className="flex flex-grow relative items-center gap-2 text-gray-700 font-semibold hover:text-red-500 transition-colors px-4 border-l border-gray-200 h-full">
                  <CartIcon className="w-5 h-5" />
                  <span className="text-sm">My Orders</span>
                  <div className=" absolute left-20 bottom-8 flex items-center justify-center rounded-full bg-amber-400 w-6 h-6" >
                    <span className="text-[12px] " >{cartItems.length-1}</span>
                  </div>
                </Link>
              )}
              {/* User Profile */}
              <div className="relative h-full flex items-center px-2 border-l border-gray-200">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-9 h-9 bg-red-500 text-white font-bold rounded-full flex items-center justify-center text-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  {userInitial}
                </button>
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-100">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            {userData.role === "user" && <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-600 hover:text-red-500 transition-colors"
            >
              <SearchIcon className="w-6 h-6" />
            </button>}
            {
                // --- SVG Icons ---
                // import { IoMdAdd } from "react-icons/io";
                // import { CiReceipt } from "react-icons/ci";

                userData.role === "owner" && (
                  <div className=" md:hidden flex relative items-center justify-around w-full mx-3">
                    <div className=" p-2 text-[14px] bg-amber-100 rounded-4xl flex text-orange-400 gap-1 items-center justify-center">
                        <IoMdAdd size={21} className=" " />
                    </div>
                    <div className=" p-2 text-[14px] bg-amber-100 rounded-4xl flex text-orange-400 gap-1 items-center justify-center">
                        <CiReceipt size={21} className=" " />
                      <div className=" absolute text-[12px] w-4 flex justify-center items-center h-4 p-2 -top-0 text-white -right-2 bg-red-500 rounded-full" >

                      <span className="" >0</span>
                      </div>
                    </div>
                  </div>
                  
                )
              }
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 bg-red-500 text-white font-bold rounded-full flex items-center justify-center text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {userInitial}
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-100">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Orders
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full h-20 bg-white z-30 transition-opacity duration-300 ease-in-out ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center border border-gray-200 rounded-lg shadow-sm w-full bg-gray-50 h-12 my-4">
            <div className="flex-grow relative h-full">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search delicious food..."
                className="w-full h-full pl-11 pr-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                autoFocus={isSearchOpen}
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-3 text-gray-600 hover:text-red-500 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
