import React from "react";
import type { Account } from "./types";
import { ArrowUpRight, TrendingDown } from "lucide-react";

interface Props {
  accounts: Account[];
  monthlyChange: number;
}

const BalanceOverview: React.FC<Props> = ({ accounts, monthlyChange }) => {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Balance Overview</h3>
      <div className="text-3xl font-bold mb-2">
        ${totalBalance.toLocaleString()}
      </div>
      <div
        className={`flex items-center gap-2 text-sm ${
          monthlyChange >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {monthlyChange >= 0 ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{monthlyChange}% vs last month</span>
      </div>
    </div>
  );
};

export default BalanceOverview;
