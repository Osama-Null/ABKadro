import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "http://localhost:7119/api",
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
