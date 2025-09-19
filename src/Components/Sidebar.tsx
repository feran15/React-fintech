import React from "react";
import { Brain, LayoutDashboard, CreditCard, ArrowLeftRight, BarChart3, TrendingUp, PiggyBank, Receipt, Sparkles } from "lucide-react";

interface SidebarProps {
  userName?: string;
  lastLoginDate?: string;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true, path: "/dashboard" },
  { icon: Brain, label: "Neuro AI", active: false, path: "/ai" },
  { icon: CreditCard, label: "Accounts", active: false, path: "/accounts" },
  { icon: ArrowLeftRight, label: "Transactions", active: false, path: "/transactions" },
  { icon: BarChart3, label: "Reports", active: false, path: "/reports" },
  { icon: TrendingUp, label: "Investments", active: false, path: "/investments" },
  { icon: PiggyBank, label: "Loans", active: false, path: "/loans" },
  { icon: Receipt, label: "Taxes", active: false, path: "/taxes" },
];

const Sidebar: React.FC<SidebarProps> = ({ userName, lastLoginDate }) => {
  return (
    <div className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold">NeuroBank</span>
      </div>

      {/* Welcome */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-3 flex items-center justify-center text-xl">
          👋
        </div>
        <p className="text-sm text-gray-400 mb-1">{lastLoginDate?.toUpperCase()}</p>
        <h2 className="text-lg font-semibold">Welcome back,</h2>
        <h2 className="text-lg font-semibold">{userName}!</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              item.active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
            onClick={() => console.log(`Navigate to ${item.path}`)}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Pro Upgrade */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Activate NeuroBank Pro</span>
        </div>
        <p className="text-xs text-blue-100">Elevate finances with AI</p>
      </div>
    </div>
  );
};

export default Sidebar;
