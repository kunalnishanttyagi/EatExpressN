import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Make sure this serverUrl is defined and imported correctly
const serverUrl = 'http://localhost:5000'; // Example URL

function UserOrderCard({ data }) {
    const navigate = useNavigate();
    const [selectedRating, setSelectedRating] = useState({}); // {itemId: rating}

    // Function to format the date string
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // Handler for submitting a product rating
    const handleRating = async (itemId, rating) => {
        try {
            await axios.post(`${serverUrl}/api/item/rating`, { itemId, rating }, { withCredentials: true });
            setSelectedRating(prev => ({
                ...prev, [itemId]: rating
            }));
        } catch (error) {
            console.error("Error submitting rating:", error);
        }
    };

    // If data is not available yet, don't render anything
    if (!data || !data.shopOrders) {
        return null; // or a loading spinner
    }

    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>
            {/* Order Header */}
            <div className='flex justify-between border-b pb-2'>
                <div>
                    <p className='font-semibold'>
                        Order #{data._id.slice(-6)}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Date: {formatDate(data.createdAt)}
                    </p>
                </div>
                <div className='text-right'>
                    {data.paymentMethod === "cod" ?
                        <p className='text-sm text-gray-500'>{data.paymentMethod?.toUpperCase()}</p> :
                        <p className={`text-sm font-semibold ${data.payment ? 'text-green-600' : 'text-red-600'}`}>Payment: {data.payment ? "Paid" : "Pending"}</p>
                    }
                    {/* Display a general status, e.g., the status of the first shop order */}
                    <p className='font-medium text-blue-600'>{data.shopOrders?.[0]?.status}</p>
                </div>
            </div>

            {/* Shop-specific Orders */}
            {data.shopOrders.map((shopOrder, index) => (
                <div className='border rounded-lg p-3 bg-[#fffaf7] space-y-3' key={index}>
                    <p className='font-semibold'>{shopOrder.shop.name}</p>

                    <div className='flex space-x-4 overflow-x-auto pb-2'>
                        {shopOrder.shopOrderItems.map((item, itemIndex) => (
                            <div key={itemIndex} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'>
                                <img src={item.item.image} alt={item.name} className='w-full h-24 object-cover rounded' />
                                <p className='text-sm font-semibold mt-1 truncate'>{item.name}</p>
                                <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}</p>

                                {shopOrder.status === "delivered" && (
                                    <div className='flex space-x-1 mt-2'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                className={`text-lg ${selectedRating[item.item._id] >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                                                onClick={() => handleRating(item.item._id, star)}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between items-center border-t pt-2'>
                        <p className='font-semibold'>Subtotal: ₹{shopOrder.subtotal}</p>
                        <span className='text-sm font-medium text-blue-600'>{shopOrder.status}</span>
                    </div>
                </div>
            ))}

            {/* Order Footer */}
            <div className='flex justify-between items-center border-t pt-2'>
                <p className='font-semibold'>Total: ₹{data.totalAmount}</p>
                <button
                    className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm'
                    onClick={() => navigate(`/track-order/${data._id}`)}
                >
                    Track Order
                </button>
            </div>
        </div>
    );
}

export default UserOrderCard;