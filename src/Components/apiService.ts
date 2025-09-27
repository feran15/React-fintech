import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Login
export const login = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  return res.data;
};

// Register
export const register = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/user/register", userData);
  return res.data;
};

export default { login, register };
