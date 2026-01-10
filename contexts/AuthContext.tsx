"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    phone: string,
    country: string
  ) => Promise<void>;
  logout: () => void;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  resetPasswordWithOTP: (
    email: string,
    otp: string,
    newPassword: string
  ) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // تحميل المستخدم من التخزين المحلي
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // دالة لتحديث بيانات المستخدم
  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, ...updates } : null;
      if (updated) localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "فشل تسجيل الدخول");
      }

      const userData: User = {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        avatar: data.data.user.avatar,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.data.token);
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            token: data.data.token,
            user: userData,
            isAuthenticated: true,
          },
          version: 0,
        })
      );
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: "user@gmail.com",
        name: "Google User",
        avatar:
          "https://ui-avatars.com/api/?name=Google+User&background=random",
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    phone: string,
    country: string
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: password,
          name,
          phone,
          country,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "فشل التسجيل");
      }

      const userData: User = {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        avatar: data.data.user.avatar,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.data.token);
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            token: data.data.token,
            user: userData,
            isAuthenticated: true,
          },
          version: 0,
        })
      );
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("auth-storage");
    setUser(null);
  };

  const sendOTP = async (email: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP sent to:", email);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock verification: accept any 6-digit OTP
      return /^\d{6}$/.test(otp);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPasswordWithOTP = async (
    email: string,
    otp: string,
    newPassword: string
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Password reset with OTP for:", email);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        signup,
        logout,
        sendOTP,
        verifyOTP,
        resetPasswordWithOTP,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
