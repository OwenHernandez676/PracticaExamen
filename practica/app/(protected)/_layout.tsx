import { useAuth } from "../context/AuthContext";
import { useRouter, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (!user) {
        router.replace("/login");
      }
    }, 1000); // Esperar antes de redirigir
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Cargando autenticación...</Text>
      </View>
    );
  }

  return user ? <Slot /> : null;
}
