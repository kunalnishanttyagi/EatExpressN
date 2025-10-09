import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';
import L from 'leaflet';
import { setAddress,setLocation } from '../../redux/map.slice';
import { useSelector } from 'react-redux';
import axios from 'axios';
// --- CSS and Icon Fix for React-Leaflet ---
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import { set } from 'mongoose';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
const CashIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const UpiIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);

const CardIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
);
// --- SVG Icon Components (No Changes) ---
const MyLocationIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v.008M12 20.25v-.008M3.75 12h.008m16.5 0h-.008M6.343 6.343l.007.007m11.306 11.306l-.007-.007M6.35 17.657l-.007.007M17.657 6.35l.007-.007" /></svg>
);
const SearchIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
);
const LocationPinIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
);


// --- Map Interaction Component ---
function LocationMarker({ position, setPosition, setInputAddress }) {
    const map = useMap();
    const markerRef = useRef(null);
    // Improvement: Define API key once outside the effect
    const geoApi = import.meta.env.VITE_GEO_API;
    const dispatch=useDispatch();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 15);
        }
    }, [position, map]);

    useEffect(() => {
        if (position) {
            const fetchAddress = async () => {
                try {
                    const response = await axios.get(
                      `https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&format=json&apiKey=${geoApi}`
                    );

                    const firstResult = response.data.results[0];

                    // Improvement: Add a safety check for the response
                    if (firstResult) {
                        setInputAddress(firstResult.formatted);
                        setAddress(firstResult.formatted);
                        setLocation({latitude:firstResult.lat,longitude:firstResult.lon});
                        // setPosition({lat:firstResult.lat,lng:firstResult.lon});
                        // --- BUG FIX: REMOVED THE LINE BELOW TO PREVENT INFINITE LOOP ---
                        // setPosition({lat:response.data.results[0].lat,lng:response.data.results[0].lon});
                    } else {
                        setInputAddress('No address found at this location.');
                    }
                } catch (error) {
                    console.error("Error fetching address:", error);
                    setInputAddress('Could not fetch address');
                }
            };
            fetchAddress();
        }
    }, [position, setInputAddress, geoApi]); // Added geoApi to dependency array

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        [setPosition],
    );

    return position === null ? null : (
        <Marker 
            position={position} 
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
        />
    );
}

// --- Main Checkout Page Component (No Changes) ---
const Checkout = () => {
    const { location: reduxLocation, address: reduxAddress } = useSelector(state => state.map);
    const [position, setPosition] = useState(null);
    const [inputAddress, setInputAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(true);
    const {cartItems,totalAmount}=useSelector(state=>state.user);
    const [step,setStep]=useState(1);
    
    const geoApi = import.meta.env.VITE_GEO_API;


    //  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online'

    // In a real app, this data would come from props or a state management library
    // const cartItems = [
    //     { name: 'Chicken Burger', quantity: 4, price: 796 },
    //     { name: 'Pizza', quantity: 2, price: 398 },
    // ];
    
    // Calculate subtotal dynamically
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price*item.quantity), 0);
    const deliveryFee = 0; // Or some calculated value

    useEffect(() => {
        setInputAddress(reduxAddress || '');
    }, [reduxAddress]);

    useEffect(() => {
        if (reduxLocation && reduxLocation.lat && reduxLocation.lng) {
            setPosition(reduxLocation);
            setLoading(false);
        } else {
            locateUser();
        }
    }, [reduxLocation]);

    const locateUser = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition({ lat: latitude, lng: longitude });
                setLoading(false);
            },
            (error) => {
                console.error("Geolocation error:", error);
                setPosition({ lat: 28.6139, lng: 77.2090 }); // Default: New Delhi
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    const handlePlaceOrder =async (e) => {
        e.preventDefault();
        try{if (!inputAddress || !position) {
            alert("Please select a valid delivery location.");
            return;
        }
        console.log("Order Details:", {
            deliveryLocation: inputAddress,
            coordinates: position,
            paymentMethod: paymentMethod,
        });
        // alert('Order placed successfully! (Check console for details)');
        const response=await axios.post("http://localhost:8000/api/order/placeorder",{
            cartItems:cartItems,
            address:{text:inputAddress,latitude:position.lat,longitude:position.lng},
            paymentMethod:paymentMethod,
            totalAmount:subtotal
        },{withCredentials:true});
        console.log(response);
        if(response.data.order) setStep(2);
        }
        catch(err){
            console.log(err);
        }
    };
    const handleSearch=async()=>{
        let hii=0;
        console.log("search clicked now trying to set postions")
        const s=inputAddress.split(" ");
        // now i will put %20 in between each word
        for(let i=0;i<s.length;i++){
            s[i]=s[i]+"";
            if(i===s.length-1){
                s[i]=s[i]+"%20";
            }
            else{
                s[i]=s[i]+"%20";
            }
        }
        // now i will join the array
        const joined=s.join("");
        console.log("joined is",joined);
        const response=await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${s}&format=json&apiKey=${geoApi}`)
        console.log("response is",response);
        // const res=response.json();
        // console.log(res);
        console.log(response.data.results[0].lat,response.data.results[0].lon);
        const dataa={lat: response.data.results[0].lat,lng:response.data.results[0].lon};
        console.log(dataa);
        setPosition(dataa);
        // setPosition({response.data.results[1].lat,response.data.results[1].lon});
    }
    

    return (
        <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 md:p-8">
            {step===1 && (<div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
                <form onSubmit={handlePlaceOrder}>
                    <div className="space-y-8">
                        {/* Delivery Location Section */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
                                <LocationPinIcon className="text-blue-600 w-6 h-6" />
                                Delivery Location
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    value={inputAddress}
                                    onChange={(e) => setInputAddress(e.target.value)}
                                    placeholder="Your address will appear here..."
                                    className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    required
                                />
                                <button onClick={handleSearch} type="button" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-2">
                                    <SearchIcon className="w-5 h-5"/>
                                </button>
                                <button 
                                    type="button" 
                                    onClick={locateUser}
                                    className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition flex items-center justify-center gap-2"
                                    title="Get my current location"
                                >
                                    <MyLocationIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </section>

                        {/* Map Section */}
                        <section className="h-80 w-full rounded-lg border-2 overflow-hidden border-gray-300 shadow-inner">
                            {loading || !position ? (
                                <div className="h-full flex items-center justify-center bg-gray-100 text-gray-500">
                                    <p>Loading map and your location...</p>
                                </div>
                            ) : (
                                <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full">
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationMarker position={position} setPosition={setPosition} setInputAddress={setInputAddress} />
                                </MapContainer>
                            )}
                        </section>
                        
                        {/* Payment Method Section */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full">
            {/* --- Payment Method Section --- */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Cash on Delivery Option */}
                    <div
                        onClick={() => { console.log("payment method changed",paymentMethod); setPaymentMethod('cod')}}
                        className={`flex-1 flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                            paymentMethod === 'cod' 
                            ? 'border-red-500 bg-red-50 ring-2 ring-red-200' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                        <div className={`p-2 rounded-full ${paymentMethod === 'cod' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                           <CashIcon />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-700">Cash On Delivery</span>
                            <span className="text-sm text-gray-500">Pay when your food arrives</span>
                        </div>
                    </div>

                    {/* Online Payment Option */}
                    <div
                        onClick={() => { console.log("payment method changed",paymentMethod); setPaymentMethod('online')}}
                        className={`flex-1 flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                            paymentMethod === 'online' 
                            ? 'border-red-500 bg-red-50 ring-2 ring-red-200' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                         <div className={`flex items-center p-2 rounded-full ${paymentMethod === 'online' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                           <UpiIcon className="w-6 h-6 mr-2" />
                           <CardIcon className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-700">UPI / Credit / Debit Card</span>
                            <span className="text-sm text-gray-500">Pay Securely Online</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Order Summary Section --- */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 space-y-4">
                    {/* Dynamically render cart items */}
                    {cartItems.map((item, index) => (
                        index > 0 && (
                            <div key={index} className="flex justify-between items-center text-gray-600">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-medium">₹{item.price*item.quantity}</span>
                            </div>
                        )
                    ))}
                    
                    {/* Subtotal */}
                    <div className="flex justify-between items-center font-bold text-gray-800 border-t border-gray-200 pt-4 mt-4">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>

                    {/* Delivery Fee */}
                    <div className="flex justify-between items-center text-gray-600">
                        <span>Delivery Fee</span>
                        <span className="font-semibold text-green-600">
                           {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
                        </span>
                    </div>
                </div>
            </section>
        </div>

                        {/* Submit Button */}
                        <div className="pt-4" onClick={handlePlaceOrder} >
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-[1.01] shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={!inputAddress || !position}
                            >
                                {paymentMethod === "cod" ? "Place Order" : "Pay and Place Order"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>)}
            {step === 2 && (
                    <div className="text-center h-screen flex justify-center items-center flex-col ">
                         <h1 className="text-2xl font-bold text-green-600">Success!</h1>
                         <p className="mt-2 text-gray-600">Order placed successfully</p>
                         <a href="/" className="mt-6 inline-block w-full max-w-2xl bg-red-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
                            Back to Home
                         </a>
                    </div>
                 )}
        </div>
    );
};

export default Checkout;