import axios from "axios";
import React, { useState, useCallback } from "react";
// import { useRef } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setShopData } from "../../redux/shop.slice"
// The <Link> component was replaced with a standard <a> tag to resolve a rendering error.
// For single-page application behavior, this component must be rendered within a router context.
// import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from "react-icons/io5";

// --- Helper Components & Icons ---

const EyeIcon = ({ className = "w-5 h-5" }) => (
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
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// --- Main Component ---

const RegisterRestaurant = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  // name,
  //             city,
  //             state,
  //             phone,
  //             address,
  //             image,

  // const [formData, set
  const [name,setName]=useState("");
  // const {userData, city} = useSelector((state) => state.user);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
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
          console.log(response.data.results[0].city);
          console.log(response.data.results[0].state);
          console.log(response.data.results[0].formatted);
          const cityReceived = response.data.results[0].city;
          const stateReceived = response.data.results[0].state;
          const addressReceived = response.data.results[0].formatted;
          setCity(cityReceived);
          setState(stateReceived);
          setAddress(addressReceived);
          // console.log(cityReceived);
        } catch (error) {
          console.log(error);
        }
      });
    };
    fetchCity();
  }, [city]);

  const dispatch=useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("Restaurant creating  for:", formData);
    console.log(city, state, address);
    console.log(image);
    const formData = new FormData();
    formData.append("name",name);
    if (image) formData.append("image", image);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);
    // console.log(formData)
    for (let [key, value] of formData.entries()) {
      console.log("in form data")
  console.log(key, value);
}
    axios.post("http://localhost:8000/api/shop/createeditShop",
        
          formData,
        
        { withCredentials: true ,
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(setShopData(response.data.shop));
        if (response.data.shop) {
          setMessage(`Restaurant Created Successfully }.`);
          setStep(3); // Move to the next step
        } else {
          setMessage(
            `A password reset link has been sent to }.`
          );
        }
        // setStep(2);
        // window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.log(error.response);
      });
    // --- API call to send reset token would go here ---
  };

   const handleFileChange = (e) => {
    const file = e.target.files[0];
    //   setFormData({
    //   ...formData,
    //   image: file, // store file object
    // });
    setImage(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <div className="text-left flex justify-center flex-col items-center">
              <IoFastFoodOutline className=" text-orange-500 text-center w-12 h-12" />
              <h1 className="text-3xl font-bold text-orange-500">
                Register Your Restaurant
              </h1>
              {/* <p className="mt-1 text-gray-600"></p> */}
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Restaurant Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="BIZY espeta"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                />

                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="RestaurantImage"
                    className="block text-sm mt-2 font-medium text-gray-700 mb-1"
                  >
                    Restaurant Image
                  </label>

                  <input
                    id="RestaurantImage"
                    // ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
               focus:ring-2 focus:ring-black- focus:border-black
                dark:text-gray-700"
                  />
                  {/* {formData.image && (
                    <p className="text-xs mt-1 text-gray-500">
                      Selected: {formData.imag}
                    </p>
                  )} */}

                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="BIZY espeta"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  />

                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    placeholder="BIZY espeta"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  />

                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="BIZY espeta"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm"
              >
                Register Restaurant
              </button>
            </form>
          </>
        )}

        

        {/* Step 3: Success Message */}
        {step === 3 && (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600">Success!</h1>
            <p className="mt-2 text-gray-600">{message}</p>
            <a
              href="/signin"
              className="mt-6 inline-block w-full bg-orange-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              Back to Dashboard
            </a>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default RegisterRestaurant;
