// components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import apiService from '../Components/apiService';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  isEmailVerified: boolean;
  lastLogin: string;
}

interface Account {
  id: string;
  type: string;
  balance: number;
  accountNumber: string;
  currency: string;
}

const Dashboard: React.FC = () => {
  const { user: authUser, token, logout } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔍 Fetching dashboard data...');

        // Try to get user data
        try {
          const userResponse = await apiService.getCurrentUser();
          setUserData(userResponse.user || userResponse);
          console.log('✅ User data loaded');
        } catch (userError) {
          console.warn('⚠️ Could not load user data:', userError);
        }

        // Try to get accounts
        try {
          const accountsResponse = await apiService.getAccounts();
          setAccounts(accountsResponse.accounts || accountsResponse.data || []);
          console.log('✅ Accounts data loaded');
        } catch (accountsError: any) {
          if (accountsError.response?.status === 404) {
            console.log('ℹ️ Accounts endpoint not available yet');
            setAccounts([]);
          } else {
            throw accountsError;
          }
        }

      } catch (error: any) {
        console.error('❌ Dashboard error:', error);
        
        if (error.response?.status === 401) {
          logout();
          navigate('/login');
        } else if (error.response?.status === 404) {
          setError('Backend endpoint not available. Please check if the server is running.');
        } else {
          setError(error.response?.data?.message || 'Failed to load dashboard');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [token, navigate, logout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center max-w-md">
          <h2 className="text-2xl text-red-500 mb-4">Connection Issue</h2>
          <p className="mb-4">{error}</p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-teal-600 px-4 py-2 rounded"
            >
              Retry
            </button>
            <button 
              onClick={logout}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {userData?.firstName || 'User'}!
            </h1>
            <p className="text-gray-400">
              {userData?.accountNumber ? `Account: ${userData.accountNumber}` : 'Dashboard'}
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Total Balance */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Total Balance</h2>
          <p className="text-4xl font-bold">${totalBalance.toLocaleString()}</p>
        </div>

        {/* Accounts Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Accounts</h2>
          {accounts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accounts.map((account) => (
                <div key={account.id} className="bg-gray-700 p-4 rounded">
                  <h3 className="font-semibold capitalize">{account.type}</h3>
                  <p className="text-2xl font-bold mt-2">${account.balance.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">{account.accountNumber}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No accounts found</p>
              <p className="text-sm text-gray-500">
                The accounts endpoint might not be implemented yet on the backend.
              </p>
            </div>
          )}
        </div>

        {/* Backend Status */}
        <div className="bg-blue-900 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Backend Connection Status</h3>
          <div className="text-sm">
            <p>✅ User endpoint: Connected</p>
            <p>{accounts.length > 0 ? '✅' : '⚠️'} Accounts endpoint: {accounts.length > 0 ? 'Connected' : 'Not available'}</p>
            <p>⚠️ Transactions endpoint: Coming soon</p>
            <p>⚠️ Analytics endpoint: Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;