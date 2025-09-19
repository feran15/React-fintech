import React from "react";
import type { Transaction } from "./types";

interface Props {
  transactions: Transaction[];
}

const Transactions: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <h3 className="font-semibold mb-4 text-lg">Recent Transactions</h3>

      {/* Scrollable container if too many transactions */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 border-b border-white/10 pb-2 last:border-none"
          >
            {/* Merchant & category */}
            <div>
              <p className="font-medium text-sm sm:text-base">
                {tx.merchantName}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                {tx.category}
              </p>
            </div>

            {/* Amount */}
            <div
              className={`font-semibold text-sm sm:text-base ${
                tx.amount < 0 ? "text-red-400" : "text-green-400"
              }`}
            >
              {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
