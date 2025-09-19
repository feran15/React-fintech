import  { createContext, useContext, useState, useEffect,  } from "react";
import type { ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // check if user is already logged in (localStorage)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token?: string) => {
    if (token) {
      localStorage.setItem("authToken", token);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
