import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, setCartItems } from '../../redux/user.slice';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

import {updateQuantity} from '../../redux/user.slice';
import { MdDeleteForever } from "react-icons/md";


// --- SVG Icons for Scroller ---
const VegIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#4CAF50"/>
        <path d="M15.33 6.94002C15.33 6.94002 12.54 10.36 12.54 12.87C12.54 15.38 14.2 17 12.23 17C10.26 17 8.59999 15.38 8.59999 12.87C8.59999 10.36 11.53 6.94002 11.53 6.94002C12.06 6.20002 12.54 6.81002 12.54 7.63002C12.54 8.45002 11.75 8.97002 12.54 9.68002C13.33 10.39 15.33 9.68002 15.33 6.94002Z" fill="white"/>
    </svg>
);

const StarIcon = ({ className = "w-5 h-5", filled = false, ...props }) => (
    <svg className={className} fill={filled ? "#FBBF24" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
);

const PlusIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const MinusIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
);

const CartIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.823-6.441A.75.75 0 0018.14 5.03H6.086a.75.75 0 00-.732.539L4.5 7.5m0 0l-2.25-1.5M7.5 14.25h11.218a.75.75 0 00.732-.539l1.823-6.441a.75.75 0 00-.693-1.03H6.086a.75.75 0 00-.732.539L4.5 7.5m12.75-3.375C17.25 3.375 16.5 2.25 15 2.25c-1.5 0-2.25 1.125-2.25 2.25" />
    </svg>
);

const ChevronLeftIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const CartItem = ({item}) => {
    // const [quantity, setQuantity] = useState(item.quantity);
    const [userRating, setUserRating] = useState(Math.round(item.rating || 0));
    const [hoverRating, setHoverRating] = useState(0);
    const {cartItems}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    // const [total,setTotal]=useState(0);
    
    
    const increaseQuantity = (id,quantity) => { dispatch(updateQuantity({id,quantity:quantity+1}));}
    const decreaseQuantity = (id,quantity) => { dispatch(updateQuantity({id,quantity:quantity-1})); }
    
    

    return (
        <div className="bg-white border p-3 border-gray-200/80 rounded-xl shadow-md overflow-hidden group font-sans w-[70vw] mx-auto flex ">
            {/* Image Section */}
            {/* {item.quantity} */}
            <div className="relative overflow w-50 h-30">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                />
                
            </div>
            
            {/* Details Section */}
            <div className="flex justify-between w-full p-4 ">
                
                
                

                {/* Action Section */}
                <div className="mt-2 ">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>

                    <p>₹{item.price}*{item.quantity}</p>
                    <p className="text-red-600 font-bold text-2xl">₹{item.price*item.quantity}</p>
                    
                    
                </div>
                <div className="flex  justify-ceter gap-2">
                        {/* Quantity Controls */}
                        {/* <div className=' flex justify-end' >
                            <MdDeleteForever size={30} className=" text-red-600 " />
                        </div> */}
                        <div className='flex gap-3 justify-center items-center' >
                            <div className="flex items-center border border-gray-300 rounded-lg">
                            <button onClick={()=>decreaseQuantity(item.id,item.quantity)} className="px-2 py-2 text-gray-600 hover:text-red-600 disabled:text-gray-300 transition-colors" disabled={item.quantity === 0}>
                                <MinusIcon />
                            </button>
                            <span className="font-bold text-lg text-gray-800 w-8 text-center">{item.quantity}</span>
                            <button onClick={()=>increaseQuantity(item.id,item.quantity)} className="px-2 py-2 text-gray-600 hover:text-red-600 transition-colors">
                                <PlusIcon />
                            </button>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button 
                            className={`p-2 bg-red-500 text-white rounded-lg transition-colors shadow`}
                        onClick={()=>{ console.log(item.id); dispatch(deleteItem({id:item.id}))}} >
                            <MdDeleteForever />
                        </button>
                        </div>
                    </div>
            </div>


        </div>
    );
};

const MyCart = () => {
    const {cartItems}=useSelector(state=>state.user);
    const {totalAmount}=useSelector(state=>state.user);
    // console.log(cartItems);
  return (
    <div className=' flex justify-around w-full h-full' >
        <div className=' flex-col h-auto w-[70vw] mt-4' >
            <div className=' flex justify-center mb-10 gap-100 items-start ' >
                {/* show here a back button */}
                    <IoMdArrowBack className=' text-2xl text-red-500 hover:text-red-600 transition-colors cursor-pointer' />

                <h2>Your Cart</h2>
            </div>
            {
                cartItems.length==1?<div>Your cart is empty</div>:<div className=' w-full' >
                    {
                        <>
                        
                        {(cartItems.map((item,index)=>{
                            if(index===0) return <div key={index} ></div>
                            else
                            return (<CartItem key={index} item={item} />)
                        }))}
                        <div className="bg-white border p-3 border-gray-200/80 rounded-xl shadow-md overflow-hidden group font-sans w-[70vw] mx-auto mt-10 flex ">

                <div>Total Amount</div>

                <div>
                    ₹{totalAmount}
                </div>


            </div>
            </>
                    }
                </div>
            }

            
        </div>
    </div>
  )
}

export default MyCart
