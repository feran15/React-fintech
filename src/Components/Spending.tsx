import React from "react";
import type { SpendingCategory } from "./types";
import { ArrowUpRight, TrendingDown } from "lucide-react";

interface Props {
  spending: number;
  change: number;
  categories: SpendingCategory[];
}

const Spending: React.FC<Props> = ({ spending, change, categories }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 flex flex-col">
      {/* Title */}
      <h3 className="font-semibold mb-3 text-base sm:text-lg">Spending</h3>

      {/* Total */}
      <div className="text-2xl sm:text-3xl font-bold mb-1">
        ${spending.toLocaleString()}
      </div>

      {/* Change vs last month */}
      <div
        className={`flex items-center gap-2 text-xs sm:text-sm mb-4 ${
          change >= 0 ? "text-red-400" : "text-green-400"
        }`}
      >
        {change >= 0 ? (
          <TrendingDown className="w-4 h-4" />
        ) : (
          <ArrowUpRight className="w-4 h-4" />
        )}
        <span>{change}% vs last month</span>
      </div>

      {/* Category bars */}
      <div className="space-y-3 flex-1">
        {categories.map((cat) => (
          <div key={cat.category}>
            <div className="flex justify-between text-xs sm:text-sm mb-1">
              <span className="truncate">{cat.category}</span>
              <span className="font-medium">{cat.percentage}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className={`${cat.color} h-2 rounded-full`}
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spending;
