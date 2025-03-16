import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

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

const setRole = async (role) => {
  await setItemAsync("role", role);
};

const getRole = async () => {
  const role = await getItemAsync("role");
  return role;
};

const deleteRole = async () => {
  await deleteItemAsync("role");
};

export { setToken, getToken, deleteToken, setRole, getRole, deleteRole };
