// api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://notesverse-backend.onrender.com',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false // Remove or set to false since we're using token-based auth
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject({ message: 'No response from server' });
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject({ message: 'Error setting up the request' });
        }
    }
);

export default axiosInstance;
