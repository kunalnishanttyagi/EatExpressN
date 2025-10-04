import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setShopData } from '../../redux/shop.slice';

// --- SVG Icons ---

const EditIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

const DeleteIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

// --- Main Food Item Card Component ---


const ItemCard = ({ 

        data
    
    
}) => {
    const navigate=useNavigate();
    console.log(data)
    // const {name,price,description,imageUrl,category,type}=data;
    // onEdit = () =>{ console.log('Edit clicked for')}
    // onDelete = () => {console.log('Delete clicked for')}
    const {name,price,description,image,category,type,_id}=data;
    const onEdit = () =>{ console.log('Edit clicked for')

        navigate(`/additem?id=${_id}`);
    }
    const onDelete = () => {console.log('Delete clicked for')
        console.log(_id);
        // delete only expect two arguments so i have to send it like this 
        axios.delete("http://localhost:8000/api/item/deleteitem",{data:{itemId:_id},withCredentials:true}).then(response=>{
            console.log("response from delte ", response);
            console.log(response.data.shop)
            dispatch(setShopData(response.data.shop));
            if(response.data.shop)
                navigate(`/`);
                // window.location.href = '/:';
        }).catch(error=>{
            console.log(error.response);    
        })
    }
    return (
        <div className="font-sans w-full max-w-2xl mx-auto">
            <div className="flex bg-white border border-red-200/50 rounded-lg shadow-sm overflow-hidden">
                {/* Left Side: Image and Price */}
                <div className="w-1/3 md:w-1/4 flex-shrink-0 relative">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md">
                        <p className="text-orange-600 font-bold text-lg">
                            ₹{price}
                        </p>
                    </div>
                </div>

                {/* Right Side: Details and Actions */}
                <div className="w-2/3 md:w-3/4 p-4 flex flex-col">
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-orange-600">{name}</h3>
                        <p className="text-gray-700 mt-1">
                            <span className="font-semibold">Description:</span> {description}
                        </p>
                        <p className="text-gray-700 mt-1">
                            <span className="font-semibold">Category:</span> {category}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Food Type:</span> {type}
                        </p>
                    </div>
                    
                    {/* Action Icons */}
                    <div className="flex justify-end items-center gap-4 mt-2">
                        <button onClick={onEdit} className="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Edit item">
                            <EditIcon />
                        </button>
                        <button onClick={onDelete} className="text-gray-500 hover:text-red-600 transition-colors" aria-label="Delete item">
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        // <div>hii</div>
    );
};

export default ItemCard;
