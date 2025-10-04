import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems } from '../../redux/user.slice';

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


// --- Reusable Components ---

// A card for the "Inspiration" section (e.g., Snacks, Pizza)
const InspirationCard = ({ item }) => (
    <div className="flex-shrink-0 w-32 group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg shadow-md">
            <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full text-center text-white text-sm font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                {item.name}
            </p>
        </div>
    </div>
);

// A card for the "Best Shop" section
const ShopCard = ({key,item, shop }) => (
    <div className="flex-shrink-0 w-40 group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg shadow-md">
            <img 
                src={item.image} 
                alt="shop image" 
                className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full text-center text-white text-sm font-bold [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                {item.name}
            </p>
        </div>
    </div>
);

// FoodItemCard with an image
// const FoodItemCard = ({ item }) => (

//     <div className="bg-white border border-gray-200/80 rounded-lg shadow-sm overflow-hidden group cursor-pointer h-full">
//         <div className="overflow-hidden h-40">
//             <img 
//                 src={item.image} 
//                 alt={item.name} 
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
//             />
//         </div>
//         <div className="p-4">
//             <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
//             <p className="text-sm text-gray-600 mt-1">From: {item.shop.name}</p>
//             <p className="text-orange-600 font-bold text-lg mt-2">₹{item.price}</p>
//         </div>
//     </div>
// );


const FoodItemCard = ({item}) => {
    const [quantity, setQuantity] = useState(0);
    const [userRating, setUserRating] = useState(Math.round(item.rating || 0));
    const [hoverRating, setHoverRating] = useState(0);
    const {cartItems}=useSelector(state=>state.user);

    const handleAddToCart = () => {
        console.log("item in handleaddtocart is", item);
        quantity>0?(dispatch(setCartItems({
            id:item._id,
            name:item.name,
            price:item.price,
            shop:item.shop,
            quantity:quantity,
            foodType:item.type,
            image:item.image
        }))):null
        const quantityToAdd = quantity === 0 ? 1 : quantity;
        console.log(`Added ${quantityToAdd} of ${item.name} to cart.`);
        if(quantity === 0) setQuantity(1);
    };
    
    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));
    
    const dispatch=useDispatch();
    const handleRatingClick = (newRating) => {
        setUserRating(newRating);
        // Here you would typically send the new rating to your backend
        console.log(`User rated ${item.name} with ${newRating} stars.`);
    };

    return (
        <div className="bg-white border border-gray-200/80 rounded-xl shadow-md overflow-hidden group font-sans w-full max-w-sm mx-auto">
            {/* Image Section */}
            <div className="relative overflow w-auto h-30">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                />
                {item.isVeg && (
                    <div className="absolute top-3 right-3">
                        <VegIcon />
                    </div>
                )}
            </div>
            
            {/* Details Section */}
            <div className="p-2">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                
                {/* Interactive Rating Section */}
                <div 
                    className="flex items-center mt-2 text-gray-500"
                    onMouseLeave={() => setHoverRating(0)}
                >
                    {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;
                        return (
                            <StarIcon 
                                key={i} 
                                filled={(hoverRating || userRating) >= ratingValue} 
                                className={`w-5 h-5 cursor-pointer ${(hoverRating || userRating) >= ratingValue ? 'text-amber-400' : 'text-gray-300'}`} 
                                onClick={() => handleRatingClick(ratingValue)}
                                onMouseEnter={() => setHoverRating(ratingValue)}
                            />
                        );
                    })}
                    <span className="ml-2 text-sm">{item.reviewCount || 0}</span>
                </div>

                {/* Action Section */}
                <div className="mt-2 flex justify-between items-center">
                    <p className="text-red-600 font-bold text-2xl">₹{item.price}</p>
                    
                    <div className="flex items-center gap-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button onClick={decreaseQuantity} className="px-2 py-2 text-gray-600 hover:text-red-600 disabled:text-gray-300 transition-colors" disabled={quantity === 0}>
                                <MinusIcon />
                            </button>
                            <span className="font-bold text-lg text-gray-800 w-8 text-center">{quantity}</span>
                            <button onClick={increaseQuantity} className="px-2 py-2 text-gray-600 hover:text-red-600 transition-colors">
                                <PlusIcon />
                            </button>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <button 
                            onClick={handleAddToCart}
                            className={`p-2 bg-red-500 text-white rounded-lg transition-colors shadow ${cartItems.some(i=>i.id==item._id)?"bg-gray-800":"bg-red-500"} `}
                        >
                            <CartIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};










// Wrapper for FoodItemCard to give it a fixed width for the scroller
const ScrollerFoodItemCard = ({ item }) => (
    <div className="w-64 md:w-72 flex-shrink-0">
        <FoodItemCard item={item} />
    </div>
);

// --- Horizontal Scroller Component with Buttons ---
const HorizontalScroller = ({ items,CardComponent }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!items || items.length === 0) return null;
    console.log("items are in the card componenet ", items);

    return (
        <div className="relative group">
            {/* Left Scroll Button */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-orange-50 transition-all duration-300 transform opacity-0 group-hover:opacity-100 group-hover:translate-x-0 active:scale-95 disabled:opacity-0"
            >
                <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-hide"
            >
                {items.map((item,index) => (
                    // The key must be on the direct child of map
                    <CardComponent key={index} item={item} shop={item.shop} />
                ))}
                {/* {
                    for()
                } */}
            </div>

            {/* Right Scroll Button */}
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-orange-50 transition-all duration-300 transform opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 active:scale-95 disabled:opacity-0"
            >
                <ChevronRightIcon className="w-5 h-5 text-gray-700" />
            </button>
        </div>
    );
};


// --- Main Food Discovery Component ---

const UserDashboard = () => {
    const [inspirationItems, setInspirationItems] = useState([]);
    const [bestShops, setBestShops] = useState([]);
    const [suggestedItems, setSuggestedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const {city}=useSelector(state=>state.user);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("try to fetch data");
                // const {city}=useSelector(state=>state.user);
                console.log("city is ", city);
                // MOCK API CALLS
                const inspirationPromise = new Promise(resolve => setTimeout(() => resolve({ data: [
                    { id: 1, name: 'Snacks', imageUrl: 'https://static.toiimg.com/photo/59217136.cms' }, { id: 2, name: 'Main Course', imageUrl: 'https://www.indiafoodnetwork.in/h-upload/2021/11/02/588170-whatsapp-image-2021-11-02-at-53408-pm.webp' }, { id: 3, name: 'Desserts', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Desserts.jpg/250px-Desserts.jpg' }, { id: 4, name: 'Pizza', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjpoVQVuThCbyNKwUnxsGJPPraXTF0hWJ9w&s' }, { id: 5, name: 'Burgers', imageUrl: 'https://media.istockphoto.com/id/1074255410/photo/bacon-cheese-burger-with-beef-patty-tomato-onion-and-pizza-with-mozzarella-cheese-ham.jpg?s=612x612&w=0&k=20&c=Mxp2FIPXO6yAYoyohKhgtOp4lEfy7AXmZhJBnx4pTLo=' }, { id: 6, name: 'Sandwiches', imageUrl: 'https://www.watermelon.org/wp-content/uploads/2023/02/Sandwich_2023-1000x1000.jpg' },
                ]}), 500));
                console.log("rachere dhre");


                const response=await axios.get(`http://localhost:8000/api/shop/getshops/${city}`,{withCredentials:true});
                console.log(response.data.shops);
                // setBestShops(response.data.shops);


                
                const suggestedPromise = new Promise(resolve => setTimeout(() => resolve({ data: [
                    { id: 1, name: 'Paneer Tikka', restaurantName: 'Curry House', price: 250, imageUrl: 'https://placehold.co/400x300/f87171/white?text=Paneer+Tikka' }, { id: 2, name: 'Margherita Pizza', restaurantName: 'Pizza Place', price: 300, imageUrl: 'https://placehold.co/400x300/fb923c/white?text=Pizza' }, { id: 3, name: 'Chocolate Cake', restaurantName: 'Krishna Bakery', price: 450, imageUrl: 'https://placehold.co/400x300/fdba74/white?text=Cake' }, { id: 4, name: 'Veg Burger', restaurantName: 'Burger Point', price: 150, imageUrl: 'https://placehold.co/400x300/f97316/white?text=Burger' },
                ]}), 1200));

                const [inspirationResponse, suggestedResponse] = await Promise.all([inspirationPromise, suggestedPromise]);
                setInspirationItems(inspirationResponse.data);
                setBestShops(response.data.shops);
                for(let i=0;i<response.data.shops.length;i++){
                    console.log("items in the shops are are", response.data.shops[i].items);
                    setSuggestedItems(prev => [
                    ...prev, 
                    ...response.data.shops[i].items
                    ]);

                }

                // console.log("shops inmy area are", bestShops);
            } catch (error) {
                console.error("Failed to fetch discovery data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [city]);

    useEffect(()=>{
        console.log("city is ", city);
        console.log("shops are ", bestShops);
    },[bestShops])

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading delicious options...</div>;
    }

    return (
        <div className="bg-[#FFF7F6] font-sans p-4 md:p-8 space-y-12">
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Inspiration for your first order</h2>
                <HorizontalScroller items={inspirationItems} CardComponent={InspirationCard} />
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Shop in {city}</h2>
                <HorizontalScroller items={bestShops} CardComponent={ShopCard} />
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Suggested Food Items</h2>
                <HorizontalScroller items={suggestedItems} CardComponent={ScrollerFoodItemCard} />
            </section>
        </div>
    );
};

export default UserDashboard;

