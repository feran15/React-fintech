// AuthContext.tsx
import React, { createContext, useContext, useState,  } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../utils/api"; // Your axios instance

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountNumber?: string;
  isEmailVerified?: boolean;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(
    () => JSON.parse(localStorage.getItem("user") || "null")
  );
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const res = await apiService.login(email, password);
    const loggedUser: User = res.user || {
      id: "temp-id",
      firstName: email.split("@")[0],
      lastName: "User",
      email,
      accountNumber: "N/A",
      isEmailVerified: false,
    };

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    navigate("/dashboard");
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    const res = await apiService.register(userData);
    const newUser: User = res.user || {
      id: "temp-id",
      firstName: userData.firstName || "New",
      lastName: userData.lastName || "User",
      email: userData.email || "no-email",
      accountNumber: "N/A",
      isEmailVerified: false,
    };

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
