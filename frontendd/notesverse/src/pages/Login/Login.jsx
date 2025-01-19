import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance' // Add this import

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add this state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return;
        }
        if (!password) {
            setError("Please enter password.")
            return;
        }
        setError("");
        setIsLoading(true); // Set loading to true when starting login

        try {
            const response = await axiosInstance.post("/login", {
                email: email.trim(),
                password: password
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            } else {
                setError("Invalid response from server");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return <>
        <Navbar />
        <div className='font-bold flex items-center justify-center mt-28'>
            <div className='w-96 border rounded bg-white px-7 py-10'>
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7'>Login</h4>

                    <input
                        type='text'
                        placeholder='Email'
                        className='input-box'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                    <button
                        type='submit'
                        className='btn-primary'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className='text-sm text-center mt-4'>Dont have an account?{" "}
                        <Link to='/Signup' className="font-bold text-primary underline">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
}

export default Login