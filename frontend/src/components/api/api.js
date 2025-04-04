import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL, // Replace with your actual API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export default api;
