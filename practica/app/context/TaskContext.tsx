import React, { createContext, useState, useContext } from "react";

// Definir el tipo de una tarea
type Task = {
  id: number;
  title: string;
  completed: boolean;
};

// Definir el contexto y sus funciones
type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void; // Nueva función para editar
};

// Crear el contexto
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Crear el proveedor de contexto
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Función para agregar una tarea
  const addTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  };

  // Función para eliminar una tarea
  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Función para marcar/desmarcar como completada
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Función para editar una tarea existente
  const editTask = (id: number, newTitle: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: newTitle } : task)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de tareas
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask debe estar dentro de un TaskProvider");
  return context;
};
