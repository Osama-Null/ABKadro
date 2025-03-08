import { setItemAsync } from "expo-secure-store";

setItemAsync;

const setToken = async (token) => {
  await setItemAsync("token", token);
};

const getToken = async () => {
  const token = await getItemAsync("token");
  return token;
};

const deleteToken = async () => {
  await deleteItemAsync("token");
};

export { setToken, getToken, deleteToken };

// auth.js;
const login = async (userInfo) => {
  const ews = await instance.post("/login", userInfo);
  setToken(res.data.token);
  return res.data;
};
