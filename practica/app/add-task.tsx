import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useTask } from "./context/TaskContext";
import { useRouter } from "expo-router";

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const { addTask } = useTask();
  const router = useRouter();

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title);
      router.back();
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Nueva Tarea"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Agregar" onPress={handleAddTask} />
    </View>
  );
}
