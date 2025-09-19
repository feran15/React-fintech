import React from "react";
import {
  Brain,
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  BarChart3,
  TrendingUp,
  PiggyBank,
  Receipt,
  Sparkles,
  LogOut,
  Settings,
  HelpCircle,
  Shield,
} from "lucide-react";

interface SidebarProps {
  userName?: string;
  lastLoginDate?: string;
  isOpen: boolean;
  onClose: () => void;
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

const bottomItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help & Support", path: "/support" },
  { icon: Shield, label: "Privacy & Security", path: "/privacy" },
];

const Sidebar: React.FC<SidebarProps> = ({ userName, lastLoginDate, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-black/20 backdrop-blur-xl border-r border-white/10 p-4 md:p-6 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-lg md:text-xl font-bold">NeuroBank</span>
        </div>

        {/* Welcome */}
        <div className="mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-2 md:mb-3 flex items-center justify-center text-lg md:text-xl">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
          <p className="text-xs md:text-sm text-gray-400 mb-1">
            {lastLoginDate ? `Last login: ${lastLoginDate}` : 'WELCOME BACK'}
          </p>
          <h2 className="text-base md:text-lg font-semibold">Welcome back,</h2>
          <h2 className="text-base md:text-lg font-semibold truncate">
            {userName || "User"}!
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 md:space-y-2 mb-6 md:mb-8">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl cursor-pointer transition-all ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => {
                console.log(`Navigate to ${item.path}`);
                onClose();
              }}
            >
              <item.icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Pro Upgrade */}
        <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-xl md:rounded-2xl p-3 md:p-4 cursor-pointer hover:from-blue-700/80 hover:to-purple-700/80 transition-all mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-semibold">NeuroBank Pro</span>
          </div>
          <p className="text-xs text-blue-100/80">AI-powered financial insights</p>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 border-t border-white/10">
          {/* Additional Links */}
          <div className="space-y-1 mb-4">
            {bottomItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                onClick={() => {
                  console.log(`Navigate to ${item.path}`);
                  onClose();
                }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-red-400 transition-colors text-xs md:text-sm">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>

          {/* App Version */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-gray-500 text-center">v2.4.1 • Secure Connection</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;