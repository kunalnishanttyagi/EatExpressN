"use client"
import React, { useState, memo, useCallback } from 'react';
// import { auth } from '../firebase';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/user.slice';
import { useSelector } from 'react-redux';
// import { selectUserData } from '../../redux/user.slice';

// --- Helper Components & Icons ---

// Eye icon for password visibility toggle
const EyeIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// Google 'G' logo icon
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48" >
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.551,44,29.801,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

// --- Reusable & Memoized Form Components ---

const FormInput = memo(({ id, label, type = "text", placeholder, value, onChange, isPasswordVisible }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type === 'password' && isPasswordVisible ? 'text' : type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                />
                {type === 'password' && (
                     <button 
                        type="button" 
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        onClick={() => onChange({target: {name: 'togglePassword'}})}
                     >
                        <EyeIcon />
                    </button>
                )}
            </div>
        </div>
    );
});

const RoleButton = memo(({ roleValue, currentRole, setRole, children }) => {
    const isSelected = currentRole === roleValue;
    return (
        <button
            type="button"
            onClick={() => setRole(roleValue)}
            className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                isSelected 
                    ? 'bg-red-500 text-white shadow-sm' 
                    : 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-50'
            }`}
        >
            {children}
        </button>
    );
});


// --- Main Sign Up Page Component ---

const SignUp = () => {
    const {userData}=useSelector(state=>state.user);
    // useEffect(()=>{
    //     console.log(userData);
    // },[])
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const dispatch=useDispatch();

    const handleSubmit =async(e)=>{
        e.preventDefault();
        console.log(userData);
        console.log("Form Submitted");
        axios.post("http://localhost:8000/api/auth/signup", {
            fullName,
            mobile,
            email,
            password,
            role
        },{withCredentials:true}).then(response=>{
            console.log(response);
            dispatch(setUserData(response.data.user));
            if(response.data.user)
                window.location.href = '/dashboard';
        }).catch(error=>{
            console.log(error.response);
        });
    }

    const handleGoogleAuth=async()=>{
        console.log("hiii");
        const provider=new GoogleAuthProvider();
        console.log("hii");
        const result=await signInWithPopup(auth,provider);
        console.log("result",result);
        const email=result.user.email;
        const fullName=result.user.displayName;
        const phone=result.user.phoneNumber;
        try{
            console.log(email,fullName);
            const response=await axios.post("http://localhost:8000/api/auth/googleAuth",{
                email,
                fullName,role,phone
            },{withCredentials:true});
            console.log("response", response);
            
            dispatch(setUserData(response.data.user));
            console.log("ye mera user hai", response.data.user);
            // if(response.data.user)
                // window.location.href = '/dashboard';
        }catch(error){
            console.log(error.response);    
        }

    }

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        switch(name) {
            case 'fullName':
                setFullName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'mobile':
                setMobile(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'togglePassword':
                setPasswordVisible(v => !v);
                break;
            default:
                break;
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
                
                {/* Header */}
                <div className="text-left">
                    <h1 className="text-3xl font-bold text-red-500">Vingo</h1>
                    <p className="mt-1 text-gray-600">Create your account to get started with delicious food deliveries</p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <FormInput 
                        id="fullName" 
                        label="Full Name" 
                        placeholder="John Doe" 
                        value={fullName} 
                        onChange={handleInputChange} 
                    />
                    <FormInput 
                        id="email" 
                        label="Email" 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        value={email} 
                        onChange={handleInputChange} 
                    />
                    <FormInput 
                        id="mobile" 
                        label="Mobile" 
                        type="tel" 
                        placeholder="123-456-7890" 
                        value={mobile} 
                        onChange={handleInputChange} 
                    />
                    <FormInput 
                        id="password" 
                        label="Password" 
                        type="password" 
                        placeholder="********" 
                        value={password} 
                        onChange={handleInputChange}
                        isPasswordVisible={passwordVisible}
                    />

                    {/* Role Selector */}
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <div className="flex items-center gap-2">
                            <RoleButton roleValue="user" currentRole={role} setRole={setRole}>user</RoleButton>
                            <RoleButton roleValue="owner" currentRole={role} setRole={setRole}>owner</RoleButton>
                            <RoleButton roleValue="deliveryBoy" currentRole={role} setRole={setRole}>deliveryBoy</RoleButton>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <button 
                        type="submit" 
                        className="w-full bg-red-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm"
                    >
                        Sign Up
                    </button>

                    <button 
                        type="button" onClick={handleGoogleAuth}
                        className="w-full flex justify-center items-center gap-3 bg-white text-gray-700 font-semibold py-2.5 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm"
                    >
                        <GoogleIcon />
                        Sign up with Google
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/signin" className="font-semibold text-red-500 hover:text-red-600">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;

