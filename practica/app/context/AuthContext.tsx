import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";

// Definir los tipos del contexto
type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const login = (email: string) => {
    if (email.endsWith("@gmail.com")) {
      setUser(email);
      router.replace("/");
    } else {
      alert("Solo se permiten correos de dominio @gmail.com");
    }
  };

  const logout = () => {
    setUser(null);
    router.replace("/login");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar dentro de un AuthProvider");
  return context;
};
