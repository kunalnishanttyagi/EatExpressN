import React from 'react';
import { useSelector } from 'react-redux';
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';

const MyOrders = () => {
    // Get userData and the array of orders from the Redux state
    const { userData, myOrders } = useSelector(state => state.user);

    // It's good practice to handle the loading state or if there are no orders
    if (!myOrders || myOrders.length === 0) {
        return (
            <div className='p-4 text-center text-gray-500'>
                You have no orders yet.
            </div>
        );
    }

    return (
        <div className='space-y-4 p-4'> {/* Added some spacing for the list */}
            {userData?.role === "owner" && myOrders.map(order => (
                // For each order in the array, render a component
                // Pass the single 'order' object as the data prop
                // Add a unique 'key' prop, which is required by React for lists
                <OwnerOrderCard key={order._id} data={order} />
            ))}

            {userData?.role === "user" && myOrders.map(order => (
                // Same logic for the user role
                <UserOrderCard key={order._id} data={order} />
            ))}
        </div>
    );
}

export default MyOrders;