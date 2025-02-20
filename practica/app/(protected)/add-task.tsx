import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const { addTask } = useTask();
  const { user } = useAuth();
  const router = useRouter();

  // Evitar que usuarios no autenticados accedan
  if (!user) {
    router.replace("/login");
    return null; // No renderiza nada hasta redirigir
  }

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title);
      router.back(); // Regresar a la pantalla anterior
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Agregar Nueva Tarea
      </Text>
      <TextInput
        placeholder="Escribe el nombre de la tarea"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Guardar" onPress={handleAddTask} />
    </View>
  );
}
