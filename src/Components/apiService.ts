import axios from "axios";

const api = axios.create({
  baseURL: "https://bankingserver-production.up.railway.app/",
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
  accountNumber: string;
}) => {
  const res = await api.post("/user/register", userData);
  return res.data;
};
// Get Dashboard Data
export const getDashboardData = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/api/dashboard/body", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default { login, register };
