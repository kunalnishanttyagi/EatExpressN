import axios from 'axios';
import React, { useState, useCallback } from 'react';
// The <Link> component was replaced with a standard <a> tag to resolve a rendering error.
// For single-page application behavior, this component must be rendered within a router context.
// import { Link } from 'react-router-dom';

// --- Helper Components & Icons ---

const EyeIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// --- Main Component ---

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [otp,setOtp]=useState('');

    const checkOtp=async(e)=>{
        e.preventDefault();
        console.log(otp);
        axios.post("http://localhost:8000/api/auth/verifyotp",{
            email,
            otp
        },{withCredentials:true}).then(response=>{
            console.log(response);
            if(response.data.user)
                window.location.href = '/dashboard';
        }).catch(error=>{
            console.log(error.response);
        });
    }

    const handleEmailSubmit = useCallback((e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        console.log("Password reset requested for:", email);
        axios.post("http://localhost:8000/api/auth/sendotpforpasswordreset",{
            email,
        },{withCredentials:true}).then(response=>{
            console.log(response);
            if(response.data.user){
                
                setMessage(`A password reset link has been sent to ${email}.`);
                setStep(2); // Move to the next step
            }
                // setStep(2);
                // window.location.href = '/dashboard';
        }).catch(error=>{
            console.log(error.response);
        });
        // --- API call to send reset token would go here ---
    }, [email]);

    const handlePasswordReset = useCallback((e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 4) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        
        console.log("New password submitted:", password);
        // --- API call with new password and token would go here ---
        
        axios.post("http://localhost:8000/api/auth/changepassword",{
            email,
            password
        },{withCredentials:true}).then(response=>{
            console.log(response);
            if(response.data.email){
                
        setMessage("Your password has been reset successfully!");
        setStep(3); // Move to a final success step
            }
        }).catch(error=>{
            console.log(error.response);
        });
        
    }, [password, confirmPassword]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
                
                {/* Step 1: Enter Email */}
                {step === 1 && (
                    <>
                        <div className="text-left">
                            <h1 className="text-3xl font-bold text-red-500">Forgot Password</h1>
                            <p className="mt-1 text-gray-600">Enter your email and we'll send you a Otp</p>
                        </div>
                        <form className="space-y-5" onSubmit={handleEmailSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>
                            <button type="submit" className="w-full bg-red-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm">
                                Send Otp
                            </button>
                        </form>
                    </>
                )}

                {/* Step 2: Enter New Password */}
                {step === 2 && (
                    <>
                    
                            <h1 className="text-3xl font-bold text-red-500">Reset Your Password</h1>
                        <form onSubmit={checkOtp} className="text-left">
                            <p className="mt-1 text-gray-600">Please enter OTP sent to your registered email address.</p>
                            <input id="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="********" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            <button type="submit" className="w-full bg-red-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm">
                                Submit
                            </button>
                        </form>
                        <form className="space-y-5" onSubmit={handlePasswordReset}>
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input id="password" type={passwordVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                                <button type="button" className="absolute top-8 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600" onClick={() => setPasswordVisible(!passwordVisible)}><EyeIcon /></button>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input id="confirmPassword" type={passwordVisible ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>
                            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
                            <button type="submit" className="w-full bg-red-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm">
                                Reset Password
                            </button>
                        </form>
                    </>
                )}

                 {/* Step 3: Success Message */}
                 {step === 3 && (
                    <div className="text-center">
                         <h1 className="text-2xl font-bold text-green-600">Success!</h1>
                         <p className="mt-2 text-gray-600">{message}</p>
                         <a href="/signin" className="mt-6 inline-block w-full bg-red-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
                            Back to Sign In
                         </a>
                    </div>
                 )}


                {/* Footer Link */}
                {step !== 3 && (
                     <p className="text-center text-sm text-gray-600">
                        Remember your password?{' '}
                        <a href="/signin" className="font-semibold text-red-500 hover:text-red-600">
                            Sign In
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;

