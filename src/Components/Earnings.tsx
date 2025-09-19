import React from "react";
import { ArrowUpRight, TrendingDown } from "lucide-react";

interface Props {
  earnings: number;
  change: number;
  percentage: number;
}

const Earnings: React.FC<Props> = ({ earnings, change, percentage }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Earnings</h3>
      <div className="text-3xl font-bold mb-2">
        ${earnings.toLocaleString()}
      </div>
      <p className="text-sm text-gray-400 mb-2">
        {percentage}% of your income
      </p>
      <div
        className={`flex items-center gap-2 text-sm ${
          change >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {change >= 0 ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{change}% vs last month</span>
      </div>
    </div>
  );
};

export default Earnings;
