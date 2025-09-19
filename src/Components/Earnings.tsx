import React from "react";
import { ArrowUpRight, TrendingDown } from "lucide-react";

interface Props {
  earnings: number;
  change: number;
  percentage: number;
}

const Earnings: React.FC<Props> = ({ earnings, change, percentage }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 flex flex-col justify-between">
      {/* Title */}
      <h3 className="font-semibold mb-4 text-base md:text-lg">
        Earnings
      </h3>

      {/* Main Value */}
      <div className="text-2xl md:text-3xl font-bold mb-2 break-words">
        ${earnings.toLocaleString()}
      </div>

      {/* Sub Info */}
      <p className="text-xs md:text-sm text-gray-400 mb-3">
        {percentage}% of your income
      </p>

      {/* Change Indicator */}
      <div
        className={`flex items-center gap-2 text-xs md:text-sm font-medium ${
          change >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {change >= 0 ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{Math.abs(change)}% vs last month</span>
      </div>
    </div>
  );
};

export default Earnings;
