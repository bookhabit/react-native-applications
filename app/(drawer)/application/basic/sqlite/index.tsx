import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSqlite } from "@/hooks/useSqlite";
import { User, CreateUserData } from "@/types/sqlite";

export default function SqliteScreen() {
  const { users, isLoading, addUser, updateUser, deleteUser, deleteAllUsers } =
    useSqlite();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddUser = async () => {
    if (!name.trim() || !email.trim() || !age.trim()) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      Alert.alert("오류", "올바른 나이를 입력해주세요.");
      return;
    }

    try {
      const userData: CreateUserData = {
        name: name.trim(),
        email: email.trim(),
        age: ageNumber,
      };

      if (editingUser) {
        await updateUser(editingUser.id, userData);
        Alert.alert("성공", "사용자가 수정되었습니다.");
      } else {
        await addUser(userData);
        Alert.alert("성공", "사용자가 추가되었습니다.");
      }

      setName("");
      setEmail("");
      setAge("");
      setEditingUser(null);
      setShowModal(false);
    } catch (error) {
      Alert.alert("오류", "사용자 추가/수정 중 오류가 발생했습니다.");
      console.error("Error adding/updating user:", error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age.toString());
    setShowModal(true);
  };

  const handleDeleteUser = (user: User) => {
    Alert.alert("사용자 삭제", `${user.name}을(를) 삭제하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteUser(user.id);
            Alert.alert("성공", "사용자가 삭제되었습니다.");
          } catch (error) {
            Alert.alert("오류", "사용자 삭제 중 오류가 발생했습니다.");
            console.error("Error deleting user:", error);
          }
        },
      },
    ]);
  };

  const handleDeleteAllUsers = () => {
    Alert.alert("전체 삭제", "모든 사용자를 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteAllUsers();
            Alert.alert("성공", "모든 사용자가 삭제되었습니다.");
          } catch (error) {
            Alert.alert("오류", "사용자 삭제 중 오류가 발생했습니다.");
            console.error("Error deleting all users:", error);
          }
        },
      },
    ]);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setName("");
    setEmail("");
    setAge("");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>데이터를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SQLite 사용자 관리</Text>
        <Text style={styles.subtitle}>총 {users.length}명의 사용자</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Add User Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>새 사용자 추가</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>이름</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="이름을 입력하세요"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>이메일</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="이메일을 입력하세요"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>나이</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="나이를 입력하세요"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.buttonText}>추가</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteAllButton}
              onPress={handleDeleteAllUsers}
            >
              <Ionicons name="trash" size={20} color="white" />
              <Text style={styles.buttonText}>전체 삭제</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Users List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>사용자 목록</Text>

          {users.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>사용자가 없습니다</Text>
              <Text style={styles.emptySubtext}>새 사용자를 추가해보세요</Text>
            </View>
          ) : (
            users.map((user) => (
              <View key={user.id} style={styles.userCard}>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userAge}>나이: {user.age}</Text>
                </View>

                <View style={styles.userActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditUser(user)}
                  >
                    <Ionicons name="pencil" size={20} color="#007AFF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteUser(user)}
                  >
                    <Ionicons name="trash" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingUser ? "사용자 수정" : "새 사용자 추가"}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>이름</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="이름을 입력하세요"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>이메일</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="이메일을 입력하세요"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>나이</Text>
                <TextInput
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                  placeholder="나이를 입력하세요"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddUser}
              >
                <Text style={styles.saveButtonText}>
                  {editingUser ? "수정" : "추가"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: "white",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  deleteAllButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    backgroundColor: "white",
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  userAge: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  userActions: {
    flexDirection: "row",
    gap: 12,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#E3F2FD",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#FFEBEE",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalBody: {
    padding: 20,
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});
