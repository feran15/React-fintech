// Dashboard.tsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import BalanceOverview from "./BalanceOverview";
import Earnings from "./Earnings";
import AIInsights from "../Components/AIInsight";
import Transactions from "../Components/Transaction";
import Spending from "./Spending";
import { AlertCircle, RefreshCw, Menu, X } from "lucide-react";
import apiService from "./apiService";
import type { User, Account, Transaction, AnalyticsData, SpendingCategory, AIInsight } from "./types";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [spendingCategories, setSpendingCategories] = useState<SpendingCategory[]>([]);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      setError(null);

      const [u, a, t, an, sc, ai] = await Promise.all([
        apiService.getCurrentUser(),
        apiService.getAccounts(),
        apiService.getTransactions(10),
        apiService.getAnalytics(),
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
      console.error(err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-green-900 to-emerald-900 p-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-500/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">NeuroBank Dashboard</h2>
            <p className="text-green-200">Loading your financial insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !refreshing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-900 to-emerald-900 p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
          <p className="text-green-200 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => fetchDashboardData()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-green-900 to-emerald-900 text-white">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity lg:hidden ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-50 w-64 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar 
          userName={user?.name} 
          lastLoginDate={user?.lastLoginDate} 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64 p-4 md:p-6">
        {/* Mobile header */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white/10 backdrop-blur-xl p-2 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left column - spans 2 cols on large screens */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Top row widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <BalanceOverview accounts={accounts} monthlyChange={analytics?.monthlyChange || 0} />
              <Earnings
                earnings={analytics?.earnings || 0}
                change={analytics?.earningsChange || 0}
                percentage={analytics?.earningsPercentage || 0}
              />
            </div>
            
            {/* Transactions - full width on all screens */}
            <div className="w-full">
              <Transactions transactions={transactions} />
            </div>
          </div>

          {/* Right column - full width on mobile, 1 col on desktop */}
          <div className="space-y-4 md:space-y-6">
            <AIInsights insights={aiInsights} />
            <Spending
              spending={analytics?.spending || 0}
              change={analytics?.spendingChange || 0}
              categories={spendingCategories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;