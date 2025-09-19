import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AIInsights from "../Components/AIInsight";
import BalanceOverview from "./BalanceOverview";
import Earnings from "./Earnings";
import Spending from "./Spending";
import Transactions from "../Components/Transaction";
import apiService from "./apiService";
import type { User, Account, Transaction, AnalyticsData, SpendingCategory, AIInsight } from "./types";
import { Loader2, AlertCircle } from "lucide-react";

const NeuroBankDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [spendingCategories, setSpendingCategories] = useState<SpendingCategory[]>([]);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [u, a, t, an, sc, ai] = await Promise.all([
        apiService.getCurrentUser(),
        apiService.getAccounts(),
        apiService.getTransactions(10),
        apiService.getAnalytics("This Month"),
        apiService.getSpendingCategories(),
        apiService.getAIInsights(),
      ]);
      setUser(u);
      setAccounts(a);
      setTransactions(t);
      setAnalytics(an);
      setSpendingCategories(sc);
      setAIInsights(ai);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-white">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <Sidebar userName={user?.name} lastLoginDate={user?.lastLoginDate} />
      <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AIInsights insights={aiInsights} />
        <BalanceOverview accounts={accounts} monthlyChange={analytics?.monthlyChange || 0} />
        <Earnings
          earnings={analytics?.earnings || 0}
          change={analytics?.earningsChange || 0}
          percentage={analytics?.earningsPercentage || 0}
        />
        <Spending
          spending={analytics?.spending || 0}
          change={analytics?.spendingChange || 0}
          categories={spendingCategories}
        />
        <Transactions transactions={transactions} />
      </div>
    </div>
  );
};

export default NeuroBankDashboard;
