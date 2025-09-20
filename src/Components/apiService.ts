const API_BASE_URL = "https://banking-server-akka.onrender.com/api/dashboard";

const apiService = {
  getDashboard: async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch dashboard");
    return response.json();
  },
};
