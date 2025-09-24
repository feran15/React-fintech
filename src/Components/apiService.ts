const API_BASE_URL = "http://localhost:5000/ai/insights";

const apiService = {
  getDashboard: async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch dashboard");
    return response.json();
  },
};

export default apiService;