export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastLoginDate: string;
}

export interface Account {
  id: string;
  balance: number;
  currency: string;
  accountType: 'checking' | 'savings' | 'credit';
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  merchantName: string;
  merchantLogo?: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  cardLastFour: string;
  description?: string;
}

export interface AnalyticsData {
  totalBalance: number;
  monthlyChange: number;
  transactionVolume: number;
  volumeChange: number;
  earnings: number;
  earningsChange: number;
  earningsPercentage: number;
  spending: number;
  spendingChange: number;
}

export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

 export interface AIInsight {
   id: string;
   title: string;
   description: string;
   type: 'positive' | 'negative' | 'neutral';
   confidence: number;
 }
