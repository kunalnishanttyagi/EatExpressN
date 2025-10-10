import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

// --- Main Component ---


// --- Mock Data for Standalone Styling ---
// const mockOwnerOrders = [
//     {
//         _id: 'ORDER_7A7610',
//         createdAt: '2025-09-01T10:00:00Z',
//         customer: { fullName: 'Rohan Sharma' },
//         address: { text: '123, B-Block, Civil Lines, Bareilly' },
//         payment: 'COD',
//         shopOrder: {
//             _id: 'SHOP_ORDER_1A',
//             shop: { name: 'Krishna Bakery' },
//             subTotal: 995,
//             status: 'pending',
//             items: [
//                 { _id: 'item1', item: { name: 'Chicken Burger', image: 'https://placehold.co/150x150/F28482/FFFFFF?text=Burger' }, quantity: 2, price: 199 },
//                 { _id: 'item2', item: { name: 'Pizza', image: 'https://placehold.co/150x150/F6BD60/FFFFFF?text=Pizza' }, quantity: 3, price: 199 },
//             ]
//         }
//     },
//     {
//         _id: 'ORDER_9C2411',
//         createdAt: '2025-08-31T14:20:00Z',
//         customer: { fullName: 'Priya Singh' },
//         address: { text: '45, Rajendra Nagar, Near Park, Lucknow' },
//         payment: 'Online',
//         shopOrder: {
//             _id: 'SHOP_ORDER_2B',
//             shop: { name: 'Krishna Bakery' },
//             subTotal: 350,
//             status: 'preparing',
//             items: [
//                 { _id: 'item3', item: { name: 'Red Velvet Pastry', image: 'https://placehold.co/150x150/8D5A64/FFFFFF?text=Pastry' }, quantity: 2, price: 175 },
//             ]
//         }
//     }
// ];

// // --- Main Component ---
const OwnerOrders = () => {
    // const { orders: ownerOrders } = useSelector(state => state.order) || {};
    // const ownerOrders = mockOwnerOrders; // Using mock data for display
    // const [orders, setOrders] = useState(ownerOrders);
    const {orders}=useSelector(state=>state.orders);
    const dispatch=useDispatch();
    useEffect(() => {
        // In a real app, you'd fetch orders here and then setOrders.
        // For now, we just use the mock data.
        // setOrders(orders);
        console.log("orders are",orders);
        // console.log(orders.orders);
    }, [orders]);

    const handleStatusChange = (orderId, shopOrderId, newStatus) => {
        // This is where you would dispatch an API call to update the status.
        console.log(`Updating status for Order ${orderId}, Shop Order ${shopOrderId} to ${newStatus}`);
        
        // Optimistically update the UI
        // setOrders(currentOrders => 
        //     currentOrders.map(order => 
        //         order._id === orderId 
        //         ? { ...order, shopOrder: { ...order.shopOrder, status: newStatus } }
        //         : order
        //     )
        // );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-GB', { 
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
        });
    };

    const StatusPill = ({ status }) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            preparing: 'bg-blue-100 text-blue-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    if (!orders || orders.length === 0) {
        return <div className="p-6 text-center text-gray-500">No orders found for your shop.</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
            <header className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Shop Orders</h1>
                <p className="text-sm text-gray-500">Manage and track incoming orders for your shop.</p>
            </header>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
                        <div className="p-4 sm:p-5 border-b border-gray-200">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                                <div>
                                    <p className="font-bold text-gray-800">Order #{order._id.slice(-6)}</p>
                                    <p className=' font-bold text-gray-800' > {order.user.fullName} </p>
                                    <p className="text-xs text-gray-500 mt-1">{(order.createdAt)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-700">{order.user._id}</p>
                                    <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{order.address?.text}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5">
  {orders.map((order) => (
    <div key={order._id}>
      {order.shopOrders.map((shopOrder) =>
        shopOrder.items.map((itemData) => (
          <div key={itemData._id} className="flex items-center gap-4 mb-4">
            <img
              src={
                itemData.item?.image ||
                "https://www.w3schools.com/w3images/avatar.jpg"
              }
              alt={itemData.item?.name || itemData.name}
              className="w-16 h-16 rounded-md object-cover bg-gray-100"
            />
            <div className="flex-grow">
              <p className="font-semibold text-gray-800">
                {itemData.item?.name || itemData.name}
              </p>
              <p className="text-sm text-gray-500">
                {itemData.quantity} × ₹{itemData.price}
              </p>
            </div>
            <p className="font-bold text-gray-900">
              ₹{itemData.quantity * itemData.price}
            </p>
          </div>
        ))
      )}
    </div>
  ))}
</div>


                        {order.shopOrders?.map((shopOrder) => (
  <div
    key={shopOrder._id}
    className="bg-gray-50 p-4 sm:p-5 flex flex-wrap justify-between items-center gap-4 mb-2 rounded-md"
  >
    <div>
      <p className="text-sm text-gray-600">Subtotal:</p>
      <p className="font-bold text-lg text-gray-900">₹{shopOrder.subTotal}</p>
    </div>
    <div className="flex items-center gap-2">
      <StatusPill status={shopOrder.status} />
      <select
        value={shopOrder.status}
        onChange={(e) =>
          handleStatusChange(order._id, shopOrder._id, e.target.value)
        }
        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option value="pending">Pending</option>
        <option value="preparing">Preparing</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  </div>
))}

                    </div>
                ))}
            </div>
        </div>
    );
};


const MyOrders = () => {
    // FIX: Switched to use the live data from the Redux store.
    const { orders } = useSelector((state) => state.orders) || {};
    // const orders = reduxOrders; // Using reduxOrders now
    
    const {userData}=useSelector((state)=>state.user) || {}
    
    useEffect(()=>{
        console.log("hii");
        console.log("user data in myorders",userData)

    },[userData]);

    useEffect(() => {
        console.log("Orders from Redux store:", orders);
    }, [orders]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const StatusBadge = ({ status }) => {
        const statusStyles = {
            pending: 'text-yellow-600',
            delivered: 'text-green-600',
            cancelled: 'text-red-600',
        };
        return <span className={`text-xs font-semibold capitalize ${statusStyles[status] || 'text-gray-500'}`}>{status}</span>;
    };

    // Updated loading and empty states
    if (!orders) {
        return <div className="p-4 text-center text-gray-500">Loading your orders...</div>;
    }

    if (orders.length === 0) {
        return <div className="p-4 text-center text-gray-500">You have no past orders.</div>;
    }
    return (
        <div className="bg-gray-50 min-h-screen">
            {userData?.role==="user" && (
                <>
                <header className="bg-white shadow-sm sticky top-0 z-10 p-4 flex items-center gap-4">
                <button className="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-lg font-bold text-gray-800">My Orders</h1>
            </header>

            <main className="p-4 max-w-2xl mx-auto">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                        {/* Order Header */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                {/* FIX: Defensive access for _id which might not be available on first render */}
                                <p className="font-bold text-gray-800">Order #{order._id?.slice(-6) || '...'}</p>
                                <p className="text-sm font-semibold uppercase">{order.payment}</p>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-gray-500">Date: {formatDate(order.createdAt)}</p>
                                <StatusBadge status={order.status || 'pending'} />
                            </div>
                        </div>

                        {/* Shop-wise Item Groups */}
                        <div className="p-4 space-y-6">
                            {order.shopOrders?.map((shopOrder, index) => (
                                <div key={index}>
                                     {/* FIX: Use optional chaining in case 'shop' is not populated */}
                                    <h3 className="font-semibold text-gray-700 mb-3">{shopOrder.shop?.name || 'Shop Unavailable'}</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                                        {shopOrder.items?.map(itemData => (
                                            <div key={itemData._id} className="border rounded-md p-2 text-center shadow-sm">
                                                {/* FIX: Access the populated 'item' for image, fallback to placeholder */}
                                                <img 
                                                    src={itemData.item?.image || 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=No+Image'} 
                                                    alt={itemData.name} 
                                                    className="w-full h-20 object-cover rounded mb-2 bg-gray-100" 
                                                />
                                                {/* FIX: Use name from populated item if available, else from the order item itself */}
                                                <p className="text-sm font-semibold text-gray-800 truncate">{itemData.item?.name || itemData.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {itemData.quantity} x ₹{itemData.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Subtotal: <span className="font-bold">₹{shopOrder.subTotal}</span></span>
                                        <StatusBadge status={shopOrder.status || 'pending'} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Footer */}
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Total:</p>
                                <p className="font-bold text-xl text-gray-900">₹{order.totalAmount}</p>
                            </div>
                            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </main>
            </>
            )}
            {
                userData?.role==="owner" && <OwnerOrders/>
            }
        </div>
    );
};

export default MyOrders;

