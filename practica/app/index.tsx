import { useTask } from "./context/TaskContext";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { tasks, toggleTask, removeTask } = useTask();
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Agregar Tarea" onPress={() => router.push("/add-task")} />

      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTask(item.id)}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
              <Text style={{ textDecorationLine: item.completed ? "line-through" : "none" }}>
                {item.title}
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Button title="✏ Editar" onPress={() => router.push(`/edit-task?id=${item.id}`)} />
                <Button title="🗑" onPress={() => removeTask(item.id)} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
