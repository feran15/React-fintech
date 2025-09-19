import React from "react";
import type { Transaction } from "./types";

interface Props {
  transactions: Transaction[];
}

const Transactions: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium">{tx.merchantName}</p>
              <p className="text-gray-400">{tx.category}</p>
            </div>
            <div
              className={`font-semibold ${
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
