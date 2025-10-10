import React from 'react';
import { IoFastFoodOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// --- SVG Icons ---

// Icon for the "Register" button
const PlusIcon = ({ className = "w-8 h-8" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

// Icon for the "Edit" button
const PencilIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);


// --- Main Component ---

/**
 * A component that displays a panel for restaurant registration or management.
 * @param {object} restaurantData - Data for the registered restaurant. 
 * If null or undefined, it shows the registration prompt.
 * @param {string} restaurantData.imageUrl - URL of the restaurant's image.
 * @param {string} restaurantData.name - Name of the restaurant for the alt text.
 */
const RestaurantPanel = ({ restaurantData }) => {
    const {shopData}=useSelector(state=>state.shop);
    useEffect(()=>{
        console.log("try to reload the page if shop is updated");
    },[shopData])
    // View for users who have NOT registered a restaurant yet
    const RegisterPromptView = () => (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-red-500 p-8 text-center text-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 mb-6 bg-white/20 rounded-full flex items-center justify-center">
                < IoFastFoodOutline className=' w-12 h-12' />

            </div>
            <h2 className="text-3xl font-bold mb-2">Register Your Restaurant</h2>
            <p className="max-w-md mb-8 text-lg opacity-90">
                Join our platform to reach more customers and grow your business today!
            </p>
            <a
                href="/register-restaurant" // The route for your restaurant registration form
                className="inline-flex items-center justify-center bg-white text-orange-600 font-bold py-3 px-8 rounded-full text-lg shadow-md hover:bg-orange-50 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
                Get Started
            </a>
        </div>
    );

    // View for users who HAVE a registered restaurant
    const RegisteredView = ({ imageUrl, name }) => (
        // const image=shopData.image;
        // const name=shopData.name;
        <div className="h-full w-full relative group overflow-hidden rounded-2xl shadow-lg">
            <img
                src={imageUrl}
                alt={`Image of ${name}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-opacity duration-300"></div>
            
            <a
                href="/register-restaurant" // The route for editing the restaurant details
                className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 text-gray-800 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
                <PencilIcon className="w-5 h-5" />
                <span>Edit Shop</span>
            </a>
        </div>
    );

    return (
        // The main container that takes up half the screen height
        <section className="h-[70vh] w-full p-4 md:p-8 bg-gray-100 font-sans">
            {shopData ? (
                <RegisteredView imageUrl={shopData.image} name={shopData.name} />
            ) : (
                <RegisterPromptView />
            )}
        </section>
    );
};

export default RestaurantPanel;

