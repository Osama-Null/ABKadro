import instance from ".";
import { setToken } from "./storage";

const login = async (userInfo) => {
  const response = await instance.post("/Auth/login", {
    ...userInfo,
  });
  setToken(response.data.token);
};
export { login, register };
