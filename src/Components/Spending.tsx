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
    <div className="bg-white/5 rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Spending</h3>
      <div className="text-3xl font-bold mb-2">
        ${spending.toLocaleString()}
      </div>
      <div
        className={`flex items-center gap-2 text-sm mb-4 ${
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
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.category}>
            <div className="flex justify-between text-sm mb-1">
              <span>{cat.category}</span>
              <span>{cat.percentage}%</span>
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
