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
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from "react-native";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  createdAt: Date;
}

export default function CalendarScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventCategory, setEventCategory] = useState("일반");

  const categories = ["일반", "업무", "개인", "중요", "미팅", "생일"];

  useEffect(() => {
    loadEvents();
    setEventDate(formatDate(new Date()));
    setEventTime(formatTime(new Date()));
  }, []);

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem("calendar_events");
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents).map((event: any) => ({
          ...event,
          createdAt: new Date(event.createdAt),
        }));
        setEvents(parsedEvents);
      }
    } catch (error) {
      console.error("일정을 불러오는데 실패했습니다:", error);
    }
  };

  const saveEvents = async (newEvents: Event[]) => {
    try {
      await AsyncStorage.setItem("calendar_events", JSON.stringify(newEvents));
    } catch (error) {
      console.error("일정을 저장하는데 실패했습니다:", error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthName = (month: number) => {
    const monthNames = [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월"
    ];
    return monthNames[month];
  };

  const getDayName = (day: number) => {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return dayNames[day];
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // 이전 달의 마지막 날들
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: formatDate(new Date(year, month - 1, prevMonthDays - i)),
      });
    }
    
    // 현재 달의 날들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: formatDate(new Date(year, month, i)),
      });
    }
    
    // 다음 달의 첫 날들
    const remainingDays = 42 - days.length; // 6주 * 7일 = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: formatDate(new Date(year, month + 1, i)),
      });
    }
    
    return days;
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const openModal = (event?: Event, date?: string) => {
    if (event) {
      setEditingEvent(event);
      setEventTitle(event.title);
      setEventDescription(event.description);
      setEventDate(event.date);
      setEventTime(event.time);
      setEventCategory(event.category);
    } else {
      setEditingEvent(null);
      setEventTitle("");
      setEventDescription("");
      setEventDate(date || formatDate(new Date()));
      setEventTime(formatTime(new Date()));
      setEventCategory("일반");
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingEvent(null);
    setEventTitle("");
    setEventDescription("");
    setEventDate(formatDate(new Date()));
    setEventTime(formatTime(new Date()));
    setEventCategory("일반");
  };

  const saveEvent = () => {
    if (!eventTitle.trim()) {
      Alert.alert("오류", "일정 제목을 입력해주세요.");
      return;
    }

    if (editingEvent) {
      // 기존 일정 수정
      const updatedEvents = events.map((event) =>
        event.id === editingEvent.id
          ? {
              ...event,
              title: eventTitle.trim(),
              description: eventDescription.trim(),
              date: eventDate,
              time: eventTime,
              category: eventCategory,
            }
          : event
      );
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
    } else {
      // 새 일정 추가
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventTitle.trim(),
        description: eventDescription.trim(),
        date: eventDate,
        time: eventTime,
        category: eventCategory,
        createdAt: new Date(),
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      saveEvents(updatedEvents);
    }

    closeModal();
  };

  const deleteEvent = (id: string) => {
    Alert.alert(
      "일정 삭제",
      "정말로 이 일정을 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            const updatedEvents = events.filter((event) => event.id !== id);
            setEvents(updatedEvents);
            saveEvents(updatedEvents);
          },
        },
      ]
    );
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const renderCalendarDay = ({ item }: { item: any }) => {
    const dayEvents = getEventsForDate(item.date);
    const isToday = item.date === formatDate(new Date());
    const isSelected = item.date === formatDate(selectedDate);

    return (
      <TouchableOpacity
        style={[
          styles.calendarDay,
          item.isCurrentMonth && styles.currentMonthDay,
          isToday && styles.today,
          isSelected && styles.selectedDay,
        ]}
        onPress={() => {
          if (item.isCurrentMonth) {
            setSelectedDate(new Date(item.date));
          }
        }}
      >
        <Text
          style={[
            styles.dayNumber,
            item.isCurrentMonth && styles.currentMonthDayText,
            isToday && styles.todayText,
            isSelected && styles.selectedDayText,
          ]}
        >
          {item.day}
        </Text>
        {dayEvents.length > 0 && (
          <View style={styles.eventIndicator}>
            <Text style={styles.eventCount}>
              {dayEvents.length > 3 ? "3+" : dayEvents.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteEvent(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={Colors.light.error} />
        </TouchableOpacity>
      </View>
      {item.description && (
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      <View style={styles.eventFooter}>
        <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
    </View>
  );

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      일반: "#6B7280",
      업무: "#3B82F6",
      개인: "#10B981",
      중요: "#EF4444",
      미팅: "#8B5CF6",
      생일: "#F59E0B",
    };
    return colorMap[category] || "#6B7280";
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TextBox type="title1" style={styles.title}>
          캘린더
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          일정을 관리하고 달력으로 확인하는 앱입니다.
        </TextBox>
      </View>

      {/* 달력 헤더 */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.monthYearText}>
          {getMonthName(selectedDate.getMonth())} {selectedDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={24} color={Colors.light.text} />
        </TouchableOpacity>
      </View>

      {/* 요일 헤더 */}
      <View style={styles.weekHeader}>
        {Array.from({ length: 7 }, (_, i) => (
          <View key={i} style={styles.weekDayHeader}>
            <Text style={styles.weekDayText}>{getDayName(i)}</Text>
          </View>
        ))}
      </View>

      {/* 달력 그리드 */}
      <View style={styles.calendarGrid}>
        <FlatList
          data={generateCalendarDays()}
          renderItem={renderCalendarDay}
          keyExtractor={(item) => item.date}
          numColumns={7}
          scrollEnabled={false}
        />
      </View>

      {/* 선택된 날짜의 일정 */}
      <View style={styles.eventsSection}>
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>
            {formatDate(selectedDate)} 일정
          </Text>
          <TouchableOpacity
            style={styles.addEventButton}
            onPress={() => openModal(undefined, formatDate(selectedDate))}
          >
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={getEventsForDate(formatDate(selectedDate))}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          style={styles.eventsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={60} color={Colors.light.textSecondary} />
              <Text style={styles.emptyStateText}>
                이 날의 일정이 없습니다
              </Text>
            </View>
          }
        />
      </View>

      {/* 일정 추가/편집 모달 */}
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
              {editingEvent ? "일정 편집" : "새 일정"}
            </Text>
            <TouchableOpacity onPress={saveEvent}>
              <Text style={styles.saveButton}>저장</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput
              value={eventTitle}
              onChangeText={setEventTitle}
              placeholder="일정 제목을 입력하세요..."
              style={styles.modalTitleInput}
            />

            <View style={styles.dateTimeContainer}>
              <View style={styles.dateTimeInput}>
                <Text style={styles.dateTimeLabel}>날짜:</Text>
                <TextInput
                  value={eventDate}
                  onChangeText={setEventDate}
                  placeholder="YYYY-MM-DD"
                  style={styles.dateTimeInputField}
                />
              </View>
              <View style={styles.dateTimeInput}>
                <Text style={styles.dateTimeLabel}>시간:</Text>
                <TextInput
                  value={eventTime}
                  onChangeText={setEventTime}
                  placeholder="HH:MM"
                  style={styles.dateTimeInputField}
                />
              </View>
            </View>

            <View style={styles.categorySelector}>
              <Text style={styles.categoryLabel}>카테고리:</Text>
              <View style={styles.categoryOptions}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryOption,
                      eventCategory === category && styles.selectedCategoryOption,
                    ]}
                    onPress={() => setEventCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        eventCategory === category && styles.selectedCategoryOptionText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TextArea
              value={eventDescription}
              onChangeText={setEventDescription}
              placeholder="일정 설명을 입력하세요..."
              style={styles.modalDescriptionInput}
              rows={6}
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
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
  },
  weekHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  weekDayHeader: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.textSecondary,
  },
  calendarGrid: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  calendarDay: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.light.background,
    position: "relative",
  },
  currentMonthDay: {
    backgroundColor: Colors.light.background,
  },
  today: {
    backgroundColor: Colors.light.tint,
  },
  selectedDay: {
    backgroundColor: Colors.light.primary,
  },
  dayNumber: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  currentMonthDayText: {
    color: Colors.light.text,
  },
  todayText: {
    color: "white",
    fontWeight: "600",
  },
  selectedDayText: {
    color: "white",
    fontWeight: "600",
  },
  eventIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: Colors.light.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  eventCount: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
  eventsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  eventsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  addEventButton: {
    backgroundColor: Colors.light.tint,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
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
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    padding: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  eventFooter: {
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
  eventTime: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: 15,
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
  dateTimeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dateTimeInput: {
    flex: 1,
    marginRight: 10,
  },
  dateTimeLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.light.text,
  },
  dateTimeInputField: {
    borderWidth: 1,
    borderColor: Colors.light.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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
  modalDescriptionInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});
