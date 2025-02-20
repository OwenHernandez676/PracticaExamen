import { useTask } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // Íconos para el botón flotante y eliminar tarea

export default function HomeScreen() {
  const { tasks, toggleTask, removeTask } = useTask();
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Mis Tareas</Text>

      {/* Lista de tareas */}
      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tienes tareas pendientes.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(task) => task.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.completedTask, // Si está completada, tacharla
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>

              {/* Botón de eliminar tarea */}
              <TouchableOpacity onPress={() => removeTask(item.id)}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Botón flotante para agregar tarea */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add-task")}>
        <AntDesign name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  logoutButton: {
    alignSelf: "flex-end",
    backgroundColor: "#ff6b6b",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noTasksText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskText: {
    fontSize: 18,
    color: "#333",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
