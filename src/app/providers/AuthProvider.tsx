"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { User } from "../types/user";
import { useMutation } from "@tanstack/react-query";
import { useCreateUser } from "../hooks/useCreateUser";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase-config";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { mutate } = useMutation({
    mutationFn: useCreateUser,
    onSuccess: (data, token) => {
      localStorage.setItem("accessToken", token);
      setToken(token);
      setUser(data);
    },
    onError: (error) => {
      console.log("Erro ao criar usuário:", error);
    },
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);
      mutate(savedToken);
    }
  }, [mutate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth!, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        mutate(token);
      }
    });

    return () => unsubscribe();
  }, [mutate]);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth!, provider!);
      const user = result.user;
      if (user) {
        const token = await user.getIdToken();
        mutate(token);
      }
    } catch (error) {
      console.error("Erro no login com popup:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
