import instance from ".";
import { setToken } from "./storage";

const login = async (userInfo) => {
  const response = await instance.post("/auth/login", {...userInfo});
  console.log("Login Info 🫴 ", response.data);
  setToken(response.data.token);
  return response.data;
};
export { login };