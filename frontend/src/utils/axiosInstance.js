import axios from 'axios'
import {BASE_URL, API_PATHS} from './apiPaths.js' // Import your API_PATHS

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

// REQUEST INTERCEPTOR (This part is correct)
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

// RESPONSE INTERCEPTOR (Corrected)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;

        // Only redirect on 401 if it's NOT a login or register attempt
        if (
            error.response?.status === 401 &&
            originalRequest.url !== API_PATHS.AUTH.LOGIN &&
            originalRequest.url !== API_PATHS.AUTH.REGISTER
        ) {
            console.log("Session expired or token is invalid. Logging out.");
            localStorage.removeItem('token'); // Or your session clearing logic
            window.location.href = '/'; 
        }

        // For all other errors (including 401 on the login page),
        // just pass the error along for the component to handle.
        return Promise.reject(error)
    }
)

export default axiosInstance