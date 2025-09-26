// apiService.ts
import axios from "axios";

const API_BASE = "http://localhost:5000"; // or your backend URL

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/User/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getAccounts() {
  const res = await axios.get(`${API_BASE}/accounts`);
  return res.data;
}

export async function getTransactions(limit: number) {
  const res = await axios.get(`${API_BASE}/transactions?limit=${limit}`);
  return res.data;
}

export async function getAnalytics() {
  const res = await axios.get(`${API_BASE}/analytics`);
  return res.data;
}

export async function getSpendingCategories() {
  const res = await axios.get(`${API_BASE}/spending`);
  return res.data;
}

export async function getAIInsights() {
  const res = await axios.get(`${API_BASE}/ai/insights`);
  return res.data;
}

