import { Slot } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext"; // Asegurar que lo importamos

export default function Layout() {
  return (
    <AuthProvider>
      <TaskProvider> {/* Envolver toda la app con TaskProvider */}
        <Slot />
      </TaskProvider>
    </AuthProvider>
  );
}
