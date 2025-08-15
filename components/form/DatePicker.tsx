import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onDateChange: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledDatePickerProps<T extends FieldValues>
  extends Omit<DatePickerProps, "value" | "onDateChange"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  placeholder = "날짜를 선택해주세요",
  value,
  onDateChange,
  mode = "date",
  disabled = false,
  containerStyle,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [tempDate, setTempDate] = React.useState(value || new Date());
  const [selectedYear, setSelectedYear] = React.useState(
    tempDate.getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = React.useState(tempDate.getMonth());
  const [selectedDay, setSelectedDay] = React.useState(tempDate.getDate());

  const formatDate = (date: Date) => {
    if (mode === "time") {
      return date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (mode === "datetime") {
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    onDateChange(newDate);
    setTempDate(newDate);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedYear(tempDate.getFullYear());
    setSelectedMonth(tempDate.getMonth());
    setSelectedDay(tempDate.getDate());
    setModalVisible(false);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (month: number) => {
    const monthNames = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    return monthNames[month];
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 100; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const generateMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => i);
  };

  const generateDayOptions = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}
      <TouchableOpacity
        style={[styles.dateButton, disabled && styles.disabled]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <TextBox
          type="body1"
          style={[styles.dateText, !value && styles.placeholder]}
        >
          {value ? formatDate(value) : placeholder}
        </TextBox>
        <TextBox type="body1" style={styles.calendarIcon}>
          📅
        </TextBox>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TextBox type="title4" style={styles.modalTitle}>
                {label || "날짜 선택"}
              </TextBox>
            </View>

            <View style={styles.pickerContainer}>
              <ScrollView style={styles.pickerScrollView}>
                <View style={styles.pickerRow}>
                  <TextBox type="body1" style={styles.pickerLabel}>
                    년도
                  </TextBox>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.pickerScroll}
                  >
                    {generateYearOptions().map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.pickerOption,
                          selectedYear === year && styles.selectedPickerOption,
                        ]}
                        onPress={() => setSelectedYear(year)}
                      >
                        <TextBox
                          type="body1"
                          style={[
                            styles.pickerOptionText,
                            selectedYear === year &&
                              styles.selectedPickerOptionText,
                          ]}
                        >
                          {year}
                        </TextBox>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.pickerRow}>
                  <TextBox type="body1" style={styles.pickerLabel}>
                    월
                  </TextBox>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.pickerScroll}
                  >
                    {generateMonthOptions().map((month) => (
                      <TouchableOpacity
                        key={month}
                        style={[
                          styles.pickerOption,
                          selectedMonth === month &&
                            styles.selectedPickerOption,
                        ]}
                        onPress={() => setSelectedMonth(month)}
                      >
                        <TextBox
                          type="body1"
                          style={[
                            styles.pickerOptionText,
                            selectedMonth === month &&
                              styles.selectedPickerOptionText,
                          ]}
                        >
                          {getMonthName(month)}
                        </TextBox>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.pickerRow}>
                  <TextBox type="body1" style={styles.pickerLabel}>
                    일
                  </TextBox>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.pickerScroll}
                  >
                    {generateDayOptions().map((day) => (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.pickerOption,
                          selectedDay === day && styles.selectedPickerOption,
                        ]}
                        onPress={() => setSelectedDay(day)}
                      >
                        <TextBox
                          type="body1"
                          style={[
                            styles.pickerOptionText,
                            selectedDay === day &&
                              styles.selectedPickerOptionText,
                          ]}
                        >
                          {day}
                        </TextBox>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.selectedDateDisplay}>
                  <TextBox type="title4" style={styles.selectedDateText}>
                    선택된 날짜: {selectedYear}년 {getMonthName(selectedMonth)}{" "}
                    {selectedDay}일
                  </TextBox>
                </View>
              </ScrollView>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <TextBox type="body1" style={styles.cancelButtonText}>
                  취소
                </TextBox>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <TextBox type="body1" style={styles.confirmButtonText}>
                  확인
                </TextBox>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export function ControlledDatePicker<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledDatePickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <DatePicker {...props} value={value} onDateChange={onChange} />
          {error && (
            <TextBox type="body3" style={styles.errorText}>
              {error.message}
            </TextBox>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
  },
  dateButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  dateText: {
    flex: 1,
  },
  placeholder: {
    opacity: 0.5,
  },
  calendarIcon: {
    fontSize: 20,
  },
  disabled: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "600",
  },
  pickerContainer: {
    padding: 20,
    alignItems: "center",
  },
  pickerScrollView: {
    flex: 1,
  },
  pickerRow: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  pickerScroll: {
    maxHeight: 120,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    minWidth: 60,
    alignItems: "center",
  },
  selectedPickerOption: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  pickerOptionText: {
    fontSize: 16,
    color: "#000000",
  },
  selectedPickerOptionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  selectedDateDisplay: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    alignItems: "center",
  },
  selectedDateText: {
    color: "#007AFF",
    textAlign: "center",
  },
  modalFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  cancelButtonText: {
    color: "#6C757D",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
