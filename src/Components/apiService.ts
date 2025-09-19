import type { User, Account, Transaction, AnalyticsData, SpendingCategory, AIInsight } from "./types";

const API_BASE_URL = "https://banking-server-akka.onrender.com"; // Replace with your actual Render URL

const apiService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/current`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  getAccounts: async (): Promise<Account[]> => {
    const response = await fetch(`${API_BASE_URL}/accounts`);
    if (!response.ok) throw new Error('Failed to fetch accounts');
    return response.json();
  },

  getTransactions: async (limit?: number, offset?: number): Promise<Transaction[]> => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    
    const response = await fetch(`${API_BASE_URL}/transactions?${params}`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await fetch(`${API_BASE_URL}/analytics`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  },

  getSpendingCategories: async (): Promise<SpendingCategory[]> => {
    const response = await fetch(`${API_BASE_URL}/spending/categories`);
    if (!response.ok) throw new Error('Failed to fetch spending categories');
    return response.json();
  },

  getAIInsights: async (): Promise<AIInsight[]> => {
    const response = await fetch(`${API_BASE_URL}/ai/insights`);
    if (!response.ok) throw new Error('Failed to fetch AI insights');
    return response.json();
  },
};

export default apiService;