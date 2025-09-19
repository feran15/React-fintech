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
    <div className="bg-white/5 rounded-2xl p-6 flex flex-col justify-between">
      {/* Title */}
      <h3 className="font-semibold mb-4 text-base md:text-lg">
        Balance Overview
      </h3>

      {/* Total Balance */}
      <div className="text-2xl md:text-3xl font-bold mb-2 break-words">
        ${totalBalance.toLocaleString()}
      </div>

      {/* Monthly Change */}
      <div
        className={`flex items-center gap-2 text-xs md:text-sm font-medium ${
          monthlyChange >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {monthlyChange >= 0 ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{Math.abs(monthlyChange)}% vs last month</span>
      </div>
    </div>
  );
};

export default BalanceOverview;
