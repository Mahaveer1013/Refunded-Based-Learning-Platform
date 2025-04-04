import axios from 'axios';


const openApi = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL, // Replace with your actual API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default openApi;
