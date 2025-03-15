import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "http://192.168.1.181:5208/api",
});

export default instance;
//==========================================================
instance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
