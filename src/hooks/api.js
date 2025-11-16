import axios from "axios";

const backend_host = import.meta.env.VITE_BACKEND_HOST;

const api = axios.create({
  baseURL: backend_host,
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

export default api;
