import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Brain, 
  CreditCard, 
  ArrowLeftRight, 
  BarChart3, 
  TrendingUp, 
  PiggyBank, 
  Receipt, 
  Settings, 
  ArrowUpRight, 
  TrendingDown,
  Filter,
  Plus,
  Sparkles,
  Loader2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

// TypeScript interfaces for backend data
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastLoginDate: string;
}

interface Account {
  id: string;
  balance: number;
  currency: string;
  accountType: 'checking' | 'savings' | 'credit';
  lastUpdated: string;
}

interface Transaction {
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

interface AnalyticsData {
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

interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

// API service functions (to be implemented with your backend)
const apiService = {
  // User endpoints
  getCurrentUser: async (): Promise<User> => {
    // Mock data - replace with actual API call
    return {
      id: '1',
      name: 'George',
      email: 'george@example.com',
      lastLoginDate: 'Monday, March 24'
    };
  },

  // Account endpoints
  getAccounts: async (): Promise<Account[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        balance: 101791,
        currency: 'USD',
        accountType: 'checking',
        lastUpdated: new Date().toISOString()
      }
    ];
  },

  // Transaction endpoints
  getTransactions: async (limit?: number, offset?: number): Promise<Transaction[]> => {
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        accountId: '1',
        merchantName: 'PlayStation',
        category: 'Entertainment',
        amount: -19.99,
        currency: 'NGN',
        date: '2024-03-31T15:20:00Z',
        status: 'completed',
        cardLastFour: '0224'
      },
      {
        id: '2',
        accountId: '1',
        merchantName: 'Netflix',
        category: 'Entertainment',
        amount: -30.00,
        currency: 'NGN',
        date: '2024-03-29T17:11:00Z',
        status: 'completed',
        cardLastFour: '0224'
      },
      {
        id: '3',
        accountId: '1',
        merchantName: 'Airbnb',
        category: 'Travel',
        amount: -300.00,
        currency: 'NGN',
        date: '2024-03-29T13:20:00Z',
        status: 'completed',
        cardLastFour: '4432'
      },
      {
        id: '4',
        accountId: '1',
        merchantName: 'Tommy C.',
        category: 'Transfer',
        amount: 27.00,
        currency: 'NGN',
        date: '2024-03-27T02:31:00Z',
        status: 'completed',
        cardLastFour: '0224'
      },
      {
        id: '5',
        accountId: '1',
        merchantName: 'Apple',
        category: 'Technology',
        amount: -10.00,
        currency: 'NGN',
        date: '2024-03-27T23:04:00Z',
        status: 'completed',
        cardLastFour: '4432'
      }
    ];
  },

  // Analytics endpoints
  getAnalytics: async (period: string): Promise<AnalyticsData> => {
    // Mock data - replace with actual API call
    return {
      totalBalance: 101791,
      monthlyChange: 12,
      transactionVolume: 44,
      volumeChange: 5,
      earnings: 101791,
      earningsChange: 7,
      earningsPercentage: 58,
      spending: 114164,
      spendingChange: -2
    };
  },

  // Spending categories
  getSpendingCategories: async (): Promise<SpendingCategory[]> => {
    return [
      { category: 'Clothing', amount: 34, percentage: 34, color: 'bg-blue-500' },
      { category: 'Groceries', amount: 16, percentage: 16, color: 'bg-gray-500' },
      { category: 'Pets', amount: 8, percentage: 8, color: 'bg-gray-600' },
      { category: 'Bills', amount: 6, percentage: 6, color: 'bg-gray-700' }
    ];
  },

  // AI Insights
  getAIInsights: async (): Promise<AIInsight[]> => {
    return [
      {
        id: '1',
        title: 'Your Transaction Volume',
        description: 'has increased by 5% Since last Month',
        type: 'positive',
        confidence: 0.92
      }
    ];
  }
};

const NeuroBankDashboard: React.FC = () => {
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [spendingCategories, setSpendingCategories] = useState<SpendingCategory[]>([]);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  
  // Loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  // UI state
  const [selectedPeriod, setSelectedPeriod] = useState<string>('This Month');

  // Sidebar navigation items
  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true, path: '/dashboard' },
    { icon: Brain, label: 'Neuro AI', active: false, path: '/ai' },
    { icon: CreditCard, label: 'Accounts', active: false, path: '/accounts' },
    { icon: ArrowLeftRight, label: 'Transactions', active: false, path: '/transactions' },
    { icon: BarChart3, label: 'Reports', active: false, path: '/reports' },
    { icon: TrendingUp, label: 'Investments', active: false, path: '/investments' },
    { icon: PiggyBank, label: 'Loans', active: false, path: '/loans' },
    { icon: Receipt, label: 'Taxes', active: false, path: '/taxes' }
  ];

  // Data fetching functions
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        userData,
        accountsData,
        transactionsData,
        analyticsData,
        spendingData,
        insightsData
      ] = await Promise.all([
        apiService.getCurrentUser(),
        apiService.getAccounts(),
        apiService.getTransactions(10),
        apiService.getAnalytics(selectedPeriod),
        apiService.getSpendingCategories(),
        apiService.getAIInsights()
      ]);

      setUser(userData);
      setAccounts(accountsData);
      setTransactions(transactionsData);
      setAnalytics(analyticsData);
      setSpendingCategories(spendingData);
      setAIInsights(insightsData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  // Effect hooks
  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  // Utility functions
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getMerchantIcon = (merchantName: string): string => {
    const icons: { [key: string]: string } = {
      'PlayStation': '🎮',
      'Netflix': '📺',
      'Airbnb': '🏠',
      'Apple': '🍎',
      'Tommy C.': '👤'
    };
    return icons[merchantName] || '🏢';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
          <p className="text-white mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">NeuroBank</span>
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-3 flex items-center justify-center text-xl">
              👋
            </div>
            <p className="text-sm text-gray-400 mb-1">{user?.lastLoginDate.toUpperCase()}</p>
            <h2 className="text-lg font-semibold">Welcome back,</h2>
            <h2 className="text-lg font-semibold">{user?.name}!</h2>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                  item.active 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => {
                  // Handle navigation - integrate with your router
                  console.log(`Navigate to ${item.path}`);
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </nav>

          {/* Pro Activation */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Activate NeuroBank Pro</span>
            </div>
            <p className="text-xs text-blue-100">Elevate finances with AI</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="This Month">📅 This Month</option>
                <option value="Last Month">📅 Last Month</option>
                <option value="This Year">📅 This Year</option>
              </select>
              
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 text-sm hover:bg-white/15 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 text-sm hover:bg-white/15 transition-all">
                <Settings className="w-4 h-4" />
                Manage Widgets
              </button>
              <button className="flex items-center gap-2 bg-blue-600 rounded-xl px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-all">
                <Plus className="w-4 h-4" />
                Add new Widget
              </button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* AI Insights */}
            <div className="col-span-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"></div>
                    <div className="relative p-4">
                      <h4 className="font-semibold mb-2">{insight.title}</h4>
                      <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                          Confidence: {Math.round(insight.confidence * 100)}%
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance Overview */}
            <div className="col-span-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Balance Overview</h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
              
              {analytics && (
                <>
                  <div className="mb-4">
                    <div className="text-3xl font-bold mb-2">
                      {formatCurrency(analytics.totalBalance)}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">
                        {analytics.monthlyChange}% From last month
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <ArrowLeftRight className="w-4 h-4" />
                      <span>{analytics.transactionVolume} transactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                      <span>12 categories</span>
                    </div>
                  </div>
                </>
              )}

              {/* Mini Chart */}
              <div className="h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full">
                  <svg className="w-full h-16" viewBox="0 0 300 64">
                    <path
                      d="M0,32 Q75,16 150,24 T300,20"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="absolute top-2 right-4 text-xs text-white bg-blue-600 px-2 py-1 rounded">
                  $3320
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="col-span-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Earnings</h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
              
              {analytics && (
                <>
                  <div className="mb-4">
                    <div className="text-3xl font-bold mb-2">
                      {formatCurrency(analytics.earnings)}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">
                        {analytics.earningsChange}% From last month
                      </span>
                    </div>
                  </div>

                  {/* Circular Progress */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-700"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${analytics.earningsPercentage * 2.51} ${100 * 2.51}`}
                          className="text-blue-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-bold">{analytics.earningsPercentage}%</div>
                          <div className="text-xs text-gray-400">Percentage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span>Month goal</span>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="col-span-8 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Transactions</h3>
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-gray-400 cursor-pointer" />
                  <ArrowUpRight 
                    className="w-5 h-5 text-gray-400 cursor-pointer"
                    onClick={() => console.log('Navigate to all transactions')}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => console.log('View transaction details:', transaction.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-lg">
                        {getMerchantIcon(transaction.merchantName)}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.merchantName}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-500' : 
                            transaction.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'
                          }`}></span>
                          <span>•••• {transaction.cardLastFour}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-1">
                        {formatDate(transaction.date)}
                      </div>
                      <div className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-white'
                      }`}>
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending */}
            <div className="col-span-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Spending</h3>
                <ArrowUpRight className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
              
              {analytics && (
                <div className="mb-4">
                  <div className="text-2xl font-bold mb-2">{analytics.spending.toLocaleString()}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">
                      {Math.abs(analytics.spendingChange)} From last month
                    </span>
                  </div>
                </div>
              )}

              {/* Spending Categories */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {spendingCategories.map((category, index) => (
                  <div 
                    key={index} 
                    className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => console.log('View category details:', category.category)}
                  >
                    <div className={`w-full h-16 ${category.color} rounded-lg mb-2 flex items-end justify-center text-white font-bold transition-transform hover:scale-105`}>
                      {category.amount}
                    </div>
                    <div className="text-xs text-gray-400">{category.category}</div>
                  </div>
                ))}
              </div>

              {/* Additional Icons */}
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">🏔️</div>
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">🏠</div>
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">🎯</div>
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors">☕</div>
                </div>
                <div className="text-sm cursor-pointer hover:text-white transition-colors">+8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroBankDashboard;