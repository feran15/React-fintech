import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import apiService from "../utils/api";

type Account = {
  balance: number;
  accountNumber: string;
};

type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  description?: string;
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return logout();

        // ✅ Get account + transactions from backend
        const accountRes = await apiService.get("/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const txRes = await apiService.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAccount(accountRes.data);
        setTransactions(txRes.data);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        logout(); // force logout if invalid token
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [logout]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Welcome back, {user?.firstName}
      </h1>

      {/* Account Info */}
      {account && (
        <div className="mb-6">
          <p>Account Number: {account.accountNumber}</p>
          <p className="text-xl font-semibold">
            Balance: ₦{account.balance.toLocaleString()}
          </p>
        </div>
      )}

      {/* Transactions */}
      <h2 className="text-xl mb-2">Recent Transactions</h2>
      <ul className="space-y-2">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <li
              key={tx.id}
              className="p-3 rounded bg-gray-800 flex justify-between"
            >
              <span>{tx.description || tx.type}</span>
              <span
                className={tx.type === "credit" ? "text-green-400" : "text-red-400"}
              >
                {tx.type === "credit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <p>No transactions yet.</p>
        )}
      </ul>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
