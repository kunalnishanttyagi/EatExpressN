import axios from "axios";
import React, { useState, useCallback } from "react";
// import { useRef } from "react";
import { useEffect, useParams } from "react";
// import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const AddItem = () => {
  const dispatch=useDispatch();
  const [step,setStep]=useState(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); // this will get the ?id=XYZ from URL

  console.log("ID from query params:", id);
  const [data,setData]=useState({});
  useEffect(()=>{
    if(id) {
      console.log("id is ",id);
      axios.get(`http://localhost:8000/api/item/getitem/${id}`, {withCredentials:true}).then(response=>{
        console.log(response.data.item);
        setData(response.data.item);
        

      })
    }
    
  },[])
    
    const [message,setMessage]=useState("");
    const [name,setName]=useState(data.name?data.name:"");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState("");
    const [oldImage,setOldImage]=useState(data.image?data.image:null);
    const [category,setCategory]=useState("Snacks");
    const [type,setType]=useState("Veg");
    const [image,setImage]=useState(null);
    const categoryList=["Snacks","Main Course","Dessert","Side Dish","Burger","Pizza","Hot Pot","Ice Cream","Beverages"];
    const typeList=["Veg","Non-Veg"];
    useEffect(()=>{
      if(data.name){
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setOldImage(data.image);
        setCategory(data.category);
        setType(data.type);
      }
      console.log("data is prinited after userffeect ",data);
    },[data])

  const handleSubmit = (e) => {
    e.preventDefault();

    if(id){

      console.log("printing in frontend to check if everything received or not", name,price,description,image,category,type,id);
    // console.log("Restaurant creating  for:", formData);
    const formData = new FormData();
    formData.append("name",name);
    if (image) formData.append("image", image);
    else formData.append("oldImage", oldImage);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("type", type);
    // console.log(formData)
    for (let [key, value] of formData.entries()) {
      console.log("in form data")
  console.log(key, value);
}
    axios.post(`http://localhost:8000/api/item/edititem/${id}`,
        
          formData,
        
        { withCredentials: true ,
        }
      )
      .then((response) => {
        console.log(response.data.item);
        console.log(response.data.shop)
        dispatch(setShopData(response.data.shop));
        if (response.data.item) {
          console.log("item created successfully printing");
          setMessage(`Item Created Successfully }.`);
          setStep(3); // Move to the next step
        } else {
          setMessage(
            `Item could not be created }.`
          );
        }
        // setStep(2);
        // window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.log(error.response);
      });
      return;

    }
    console.log(name,price,description,image,category,type);
    // console.log("Restaurant creating  for:", formData);
    const formData = new FormData();
    formData.append("name",name);
    if (image) formData.append("image", image);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("type", type);
    // console.log(formData)
    for (let [key, value] of formData.entries()) {
      console.log("in form data")
  console.log(key, value);
}
    axios.post("http://localhost:8000/api/item/createitem",
        
          formData,
        
        { withCredentials: true ,
        }
      )
      .then((response) => {
        console.log(response.data.item);
        console.log(response.data.shop)
        dispatch(setShopData(response.data.shop));
        if (response.data.item) {
          console.log("item created successfully printing");
          setMessage(`Item Created Successfully }.`);
          setStep(3); // Move to the next step
        } else {
          setMessage(
            `Item could not be created }.`
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
                Add Item 
              </h1>
              {/* <p className="mt-1 text-gray-600"></p> */}
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Name
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
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    placeholder="This dish is made by seasoning the meat with spices and then grilling it."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  />

                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price 
                  </label>
                  {/* // here i need a price setter */}
                  <input 
                    id="price" 
                    type="number" 
                    placeholder="BIZY espeta" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  />

                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={category} onChange={(e)=>{setCategory(categoryList[e.target.value])}} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                    {/* enum:["Snacks","Main Course","Dessert","Side Dish","Burger","Pizza","Hot Pot","Ice Cream","Beverages"], */}
                    <option value="1">Snacks</option>
                    <option value="2">Main Course</option>
                    <option value="3">Dessert</option>
                    <option value="4">Side Dish</option>
                    <option value="5">Burger</option>
                    <option value="6">Pizza</option>
                    <option value="7">Hot Pot</option>
                    <option value="8">Ice Cream</option>
                    <option value="9">Beverages</option>
                  </select>

                  <label  htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" value={type} onChange={(e)=>{setType(typeList[e.target.value-1])}} >
                    {/* enum:["Veg","Non-Veg"], */}
                    <option value="1">Veg</option>
                    <option value="2">Non-Veg</option>
                  </select>

                  
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm"
              >
                Add Item
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

export default AddItem;
