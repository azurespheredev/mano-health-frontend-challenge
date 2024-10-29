import axios from "axios";

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export default axiosService;