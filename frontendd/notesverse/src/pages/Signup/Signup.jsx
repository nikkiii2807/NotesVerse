import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance' // Add this import

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [names,setNames]=useState("")
    const navigate=useNavigate()
    
    const handleSignup = async (e) => {
        e.preventDefault();

        if(!names){
            setError("Please enter your name")
            return;
        }
        
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        
        if (!password) {
            setError("Please enter password.");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        // Proceed with signup logic (e.g., API call)

        try {
            const response = await axiosInstance.post("/create-acc", {
                fullName:names,
                email: email.trim(),
                password: password
            });

            if (response.data && response.data.error) {
                setError(response.data.message)
                return
            } if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
            else{
                setError("Please try again.error occured")
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "An unexpected error occurred. Please try again.");
        } 
    };

    return (
        <>
            <Navbar />
            <div className="font-bold flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleSignup}>
                        <h4 className="text-2xl mb-7">Signup</h4>
                        
                        <input 
                            type="text" 
                            placeholder="Name" 
                            className="input-box"
                            value={names}
                            onChange={(e) => setNames(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Email" 
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <PasswordInput 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        
                        <PasswordInput 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        
                        <button type="submit" className="btn-primary">Signup</button>
                        
                        <p className="text-sm text-center mt-4">Already have an account?{" "}
                            <Link to="/Login" className="font-bold text-primary underline">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
