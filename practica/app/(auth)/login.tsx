import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animación de entrada para el login box
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loginBox, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={() => login(email)}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9", // Color de fondo claro
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: "90%",
    maxWidth: 400, // Limita el ancho en tablets
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f1f3f6",
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
