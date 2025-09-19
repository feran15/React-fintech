import type { User } from "./types";
import type { Account } from "./types";
import type { Transaction } from "./types";
import type { AnalyticsData } from "./types";
import type { SpendingCategory } from "./types";
import type { AIInsight } from "./types";

const apiService = {
  getCurrentUser: async (): Promise<User> => ({
    id: "1",
    name: "George",
    email: "george@example.com",
    lastLoginDate: "Monday, March 24",
  }),

  getAccounts: async (): Promise<Account[]> => [
    {
      id: "1",
      balance: 101791,
      currency: "USD",
      accountType: "checking",
      lastUpdated: new Date().toISOString(),
    },
  ],

  getTransactions: async (limit?: number, offset?: number): Promise<Transaction[]> => {
    const allTransactions: Transaction[] = [
      {
        id: "1",
        accountId: "1",
        merchantName: "PlayStation",
        category: "Entertainment",
        amount: -19.99,
        currency: "NGN",
        date: "2024-03-31T15:20:00Z",
        status: "completed",
        cardLastFour: "0224",
      },
      {
        id: "2",
        accountId: "1",
        merchantName: "Netflix",
        category: "Entertainment",
        amount: -30.0,
        currency: "NGN",
        date: "2024-03-29T17:11:00Z",
        status: "completed",
        cardLastFour: "0224",
      },
    ];

    const start = offset || 0;
    const end = limit ? start + limit : allTransactions.length;
    
    return allTransactions.slice(start, end);
  },

 getAnalytics: async (): Promise<AnalyticsData> => ({
  totalBalance: 101791,
  monthlyChange: 12,
  transactionVolume: 44,
  volumeChange: 5,
  earnings: 101791,
  earningsChange: 7,
  earningsPercentage: 58,
  spending: 114164,
  spendingChange: -2,
}),
  getSpendingCategories: async (): Promise<SpendingCategory[]> => [
    { category: "Clothing", amount: 34, percentage: 34, color: "bg-blue-500" },
    { category: "Groceries", amount: 16, percentage: 16, color: "bg-gray-500" },
  ],

  getAIInsights: async (): Promise<AIInsight[]> => [
    {
      id: "1",
      title: "Your Transaction Volume",
      description: "has increased by 5% Since last Month",
      type: "positive",
      confidence: 0.92,
    },
  ],
};

export default apiService; // Only this one export