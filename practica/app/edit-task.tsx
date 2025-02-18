import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useTask } from "./context/TaskContext";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditTaskScreen() {
  const { editTask, tasks } = useTask();
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Obtener ID de la URL

  // Convertir ID a número
  const taskId = Number(id);
  const taskToEdit = tasks.find(task => task.id === taskId);
  const [newTitle, setNewTitle] = useState(taskToEdit?.title || "");

  const handleEditTask = () => {
    if (newTitle.trim()) {
      editTask(taskId, newTitle);
      router.back();
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Editar Tarea</Text>

      {taskToEdit ? (
        <>
          <TextInput
            placeholder="Nuevo título de la tarea"
            value={newTitle}
            onChangeText={setNewTitle}
            style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
          />
          <Button title="Guardar Cambios" onPress={handleEditTask} />
        </>
      ) : (
        <Text style={{ color: "red" }}>Tarea no encontrada</Text>
      )}
    </View>
  );
}
