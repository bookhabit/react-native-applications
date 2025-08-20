import { TextBox } from "@/components/atom/TextBox";
import { TextArea } from "@/components/form";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from "react-native";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteCategory, setNoteCategory] = useState("일반");

  const categories = ["all", "일반", "업무", "개인", "아이디어", "중요"];

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [notes, searchQuery, selectedCategory]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error("메모를 불러오는데 실패했습니다:", error);
    }
  };

  const saveNotes = async (newNotes: Note[]) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    } catch (error) {
      console.error("메모를 저장하는데 실패했습니다:", error);
    }
  };

  const filterNotes = () => {
    let filtered = notes;

    // 카테고리 필터링
    if (selectedCategory !== "all") {
      filtered = filtered.filter((note) => note.category === selectedCategory);
    }

    // 검색어 필터링
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 최신순 정렬
    filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    setFilteredNotes(filtered);
  };

  const openModal = (note?: Note) => {
    if (note) {
      setEditingNote(note);
      setNoteTitle(note.title);
      setNoteContent(note.content);
      setNoteCategory(note.category);
    } else {
      setEditingNote(null);
      setNoteTitle("");
      setNoteContent("");
      setNoteCategory("일반");
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingNote(null);
    setNoteTitle("");
    setNoteContent("");
    setNoteCategory("일반");
  };

  const saveNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      Alert.alert("오류", "제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (editingNote) {
      // 기존 메모 수정
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              title: noteTitle.trim(),
              content: noteContent.trim(),
              category: noteCategory,
              updatedAt: new Date(),
            }
          : note
      );
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
    } else {
      // 새 메모 추가
      const newNote: Note = {
        id: Date.now().toString(),
        title: noteTitle.trim(),
        content: noteContent.trim(),
        category: noteCategory,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
    }

    closeModal();
  };

  const deleteNote = (id: string) => {
    Alert.alert(
      "메모 삭제",
      "정말로 이 메모를 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
            saveNotes(updatedNotes);
          },
        },
      ]
    );
  };

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => openModal(item)}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNote(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={Colors.light.error} />
        </TouchableOpacity>
      </View>
      <Text style={styles.noteContent} numberOfLines={3}>
        {item.content}
      </Text>
      <View style={styles.noteFooter}>
        <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.noteDate}>
          {item.updatedAt.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      일반: "#6B7280",
      업무: "#3B82F6",
      개인: "#10B981",
      아이디어: "#F59E0B",
      중요: "#EF4444",
    };
    return colorMap[category] || "#6B7280";
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TextBox type="title1" style={styles.title}>
          메모장
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          제목과 내용을 포함한 메모를 작성하는 앱입니다.
        </TextBox>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="메모 검색..."
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category === "all" ? "전체" : category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredNotes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
        style={styles.notesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={80} color={Colors.light.textSecondary} />
            <Text style={styles.emptyStateText}>
              {searchQuery.trim() || selectedCategory !== "all"
                ? "검색 결과가 없습니다"
                : "첫 번째 메모를 작성해보세요"}
            </Text>
          </View>
        }
      />

      {/* 메모 작성/편집 모달 */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.cancelButton}>취소</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingNote ? "메모 편집" : "새 메모"}
            </Text>
            <TouchableOpacity onPress={saveNote}>
              <Text style={styles.saveButton}>저장</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput
              value={noteTitle}
              onChangeText={setNoteTitle}
              placeholder="제목을 입력하세요..."
              style={styles.modalTitleInput}
            />

            <View style={styles.categorySelector}>
              <Text style={styles.categoryLabel}>카테고리:</Text>
              <View style={styles.categoryOptions}>
                {categories.slice(1).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryOption,
                      noteCategory === category && styles.selectedCategoryOption,
                    ]}
                    onPress={() => setNoteCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        noteCategory === category && styles.selectedCategoryOptionText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TextArea
              value={noteContent}
              onChangeText={setNoteContent}
              placeholder="메모 내용을 입력하세요..."
              style={styles.modalContentInput}
              rows={10}
            />
          </View>
        </ThemedView>
      </Modal>
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
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: Colors.light.tint,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
  },
  selectedCategory: {
    backgroundColor: Colors.light.tint,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedCategoryText: {
    color: "white",
    fontWeight: "600",
  },
  notesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  noteItem: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    padding: 4,
  },
  noteContent: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  noteDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.background,
  },
  cancelButton: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  saveButton: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitleInput: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: Colors.light.text,
  },
  categoryOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: Colors.light.background,
  },
  selectedCategoryOption: {
    backgroundColor: Colors.light.tint,
  },
  categoryOptionText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedCategoryOptionText: {
    color: "white",
    fontWeight: "500",
  },
  modalContentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});
