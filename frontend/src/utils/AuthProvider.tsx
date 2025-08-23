import React, { useState, useContext, createContext } from "react";
import type { ReactNode } from "react";

// Define your user type instead of `any` later
interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const value: AuthContextType = {
    user,
    setUser,
    isUserLoggedIn,
    setIsUserLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
