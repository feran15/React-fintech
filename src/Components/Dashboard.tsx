import { useEffect, useState } from "react";
import { Home, CreditCard, Send, List, LogOut } from "lucide-react";
import { getDashboardData } from "./apiService";
import { useAuth } from "../context/AuthContext";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
}

interface UserData {
  firstName?: string;
  accountNumber: string;
  balance: number;
  accountType?: string;
  transactions: Transaction[];
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: authUser, logout } = useAuth(); // 👈 get logout from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!dashboardData) return <p className="text-red-500">Failed to load data</p>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="flex-1 p-6 pb-20 md:pb-6 md:ml-64 space-y-6">
        {/* Balance Card */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>

            <h2 className="text-lg font-semibold text-green-400">
              Available Balance
            </h2>
            {/* 👇 Greeting in balance card */}
            <p className="text-sm text-gray-400 mb-4">
              Account Number: {dashboardData.accountNumber || "1234567890"}
            </p>
            <p className="text-3xl sm:text-4xl font-bold mt-2">
              ₦{(dashboardData.balance ?? 1500000).toLocaleString()}
            </p>
          </div>
          <button className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg cursor-pointer">
            New Payment
          </button>
        </div>

        {/* Transactions */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-green-400 mb-4">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">Title</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.transactions.map((t) => (
                  <tr key={t.id} className="border-b border-gray-700">
                    <td className="py-2">{t.description}</td>
                    <td className="py-2 text-green-400">
                      ₦{t.amount.toLocaleString()}
                    </td>
                    <td className="py-2 text-green-400">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-gray-950 p-6 flex-col">
        <h1 className="text-2xl font-bold text-green-400 mb-2">
          Welcome, {authUser?.firstName || "Guest"}
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Account: {dashboardData.accountType || "Basic"}
        </p>

        <nav className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-2 hover:text-green-400">
            <Home size={18} /> Overview
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-green-400">
            <CreditCard size={18} /> Accounts
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-green-400">
            <Send size={18} /> Payments
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-green-400">
            <List size={18} /> Transactions
          </a>

          {/* 🚪 Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-2 mt-6 text-red-400 hover:text-red-500"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
    </div>
  );
}
