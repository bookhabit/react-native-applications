import { TextBox } from "@/components/atom/TextBox";
import { Button } from "@/components/form";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from "react-native";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // AsyncStorage에서 할 일 목록 불러오기
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        setTodos(parsedTodos);
      }
    } catch (error) {
      console.error("할 일 목록을 불러오는데 실패했습니다:", error);
    }
  };

  const saveTodos = async (newTodos: TodoItem[]) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(newTodos));
    } catch (error) {
      console.error("할 일 목록을 저장하는데 실패했습니다:", error);
    }
  };

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setNewTodoText("");
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    Alert.alert(
      "할 일 삭제",
      "정말로 이 할 일을 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
            saveTodos(updatedTodos);
          },
        },
      ]
    );
  };

  const clearCompleted = () => {
    Alert.alert(
      "완료된 할 일 삭제",
      "완료된 모든 할 일을 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            const updatedTodos = todos.filter((todo) => !todo.completed);
            setTodos(updatedTodos);
            saveTodos(updatedTodos);
          },
        },
      ]
    );
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={[styles.todoItem, item.completed && styles.completedTodo]}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
      >
        <Ionicons
          name={item.completed ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={item.completed ? Colors.light.tint : Colors.light.text}
        />
        <Text
          style={[
            styles.todoText,
            item.completed && styles.completedTodoText,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={Colors.light.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TextBox type="title1" style={styles.title}>
          To-Do 리스트
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          할 일을 관리하고 완료 상태를 추적하는 앱입니다.
        </TextBox>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="새로운 할 일을 입력하세요..."
          style={styles.input}
          onSubmitEditing={addTodo}
        />
        <Button
          title="추가"
          onPress={addTodo}
          style={styles.addButton}
          disabled={!newTodoText.trim()}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.activeFilterText]}>
            전체 ({todos.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "active" && styles.activeFilter]}
          onPress={() => setFilter("active")}
        >
          <Text style={[styles.filterText, filter === "active" && styles.activeFilterText]}>
            진행중 ({todos.filter(t => !t.completed).length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "completed" && styles.activeFilter]}
          onPress={() => setFilter("completed")}
        >
          <Text style={[styles.filterText, filter === "completed" && styles.activeFilterText]}>
            완료 ({todos.filter(t => t.completed).length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTodos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        style={styles.todoList}
        showsVerticalScrollIndicator={false}
      />

      {todos.some((todo) => todo.completed) && (
        <View style={styles.clearButtonContainer}>
          <Button
            title="완료된 할 일 모두 삭제"
            onPress={clearCompleted}
            style={styles.clearButton}
          />
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    minWidth: 80,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    alignItems: "center",
  },
  activeFilter: {
    backgroundColor: Colors.light.tint,
  },
  filterText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  activeFilterText: {
    color: "white",
    fontWeight: "600",
  },
  todoList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedTodo: {
    opacity: 0.7,
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    marginLeft: 12,
    color: Colors.light.text,
  },
  completedTodoText: {
    textDecorationLine: "line-through",
    color: Colors.light.textSecondary,
  },
  deleteButton: {
    padding: 8,
  },
  clearButtonContainer: {
    padding: 20,
  },
  clearButton: {
    backgroundColor: Colors.light.error,
  },
});
