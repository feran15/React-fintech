import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import BalanceOverview from "./BalanceOverview";
import Earnings from "./Earnings";
import AIInsights from "../Components/AIInsight";
import Transactions from "../Components/Transaction";
import Spending from "./Spending";
import { Loader2, AlertCircle, Menu, X } from "lucide-react";
import apiService from "./apiService";
import type { User, Account, Transaction, AnalyticsData, SpendingCategory, AIInsight } from "./types";

const NeuroBankDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [spendingCategories, setSpendingCategories] = useState<SpendingCategory[]>([]);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
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
        <div className="text-center p-4">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-white mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
       <Sidebar 
  userName={user?.name} 
  lastLoginDate={user?.lastLoginDate}
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-0 lg:ml-64 p-4 md:p-6">
        {/* Mobile header */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white/10 p-2 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Dashboard Grid - Responsive layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
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

export default NeuroBankDashboard;