import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TimePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onTimeChange: (time: Date) => void;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledTimePickerProps<T extends FieldValues>
  extends Omit<TimePickerProps, "value" | "onTimeChange"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  placeholder = "시간을 선택해주세요",
  value,
  onTimeChange,
  disabled = false,
  containerStyle,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [tempTime, setTempTime] = React.useState(value || new Date());
  const [selectedHour, setSelectedHour] = React.useState(tempTime.getHours());
  const [selectedMinute, setSelectedMinute] = React.useState(
    tempTime.getMinutes()
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleConfirm = () => {
    const newTime = new Date(tempTime);
    newTime.setHours(selectedHour, selectedMinute, 0, 0);
    onTimeChange(newTime);
    setTempTime(newTime);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedHour(tempTime.getHours());
    setSelectedMinute(tempTime.getMinutes());
    setModalVisible(false);
  };

  const generateHourOptions = () => {
    return Array.from({ length: 24 }, (_, i) => i);
  };

  const generateMinuteOptions = () => {
    return Array.from({ length: 60 }, (_, i) => i);
  };

  const formatHour = (hour: number) => {
    return hour.toString().padStart(2, "0");
  };

  const formatMinute = (minute: number) => {
    return minute.toString().padStart(2, "0");
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}
      <TouchableOpacity
        style={[styles.timeButton, disabled && styles.disabled]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <TextBox
          type="body1"
          style={[styles.timeText, !value && styles.placeholder]}
        >
          {value ? formatTime(value) : placeholder}
        </TextBox>
        <TextBox type="body1" style={styles.clockIcon}>
          🕐
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
                {label || "시간 선택"}
              </TextBox>
            </View>

            <View style={styles.pickerContainer}>
              <ScrollView style={styles.pickerScrollView}>
                <View style={styles.pickerRow}>
                  <TextBox type="body1" style={styles.pickerLabel}>
                    시간
                  </TextBox>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.pickerScroll}
                  >
                    {generateHourOptions().map((hour) => (
                      <TouchableOpacity
                        key={hour}
                        style={[
                          styles.pickerOption,
                          selectedHour === hour && styles.selectedPickerOption,
                        ]}
                        onPress={() => setSelectedHour(hour)}
                      >
                        <TextBox
                          type="body1"
                          style={[
                            styles.pickerOptionText,
                            selectedHour === hour &&
                              styles.selectedPickerOptionText,
                          ]}
                        >
                          {formatHour(hour)}
                        </TextBox>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.pickerRow}>
                  <TextBox type="body1" style={styles.pickerLabel}>
                    분
                  </TextBox>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.pickerScroll}
                  >
                    {generateMinuteOptions().map((minute) => (
                      <TouchableOpacity
                        key={minute}
                        style={[
                          styles.pickerOption,
                          selectedMinute === minute &&
                            styles.selectedPickerOption,
                        ]}
                        onPress={() => setSelectedMinute(minute)}
                      >
                        <TextBox
                          type="body1"
                          style={[
                            styles.pickerOptionText,
                            selectedMinute === minute &&
                              styles.selectedPickerOptionText,
                          ]}
                        >
                          {formatMinute(minute)}
                        </TextBox>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.selectedTimeDisplay}>
                  <TextBox type="title4" style={styles.selectedTimeText}>
                    선택된 시간: {formatHour(selectedHour)}:
                    {formatMinute(selectedMinute)}
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

export function ControlledTimePicker<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledTimePickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <TimePicker {...props} value={value} onTimeChange={onChange} />
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
  timeButton: {
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
  timeText: {
    flex: 1,
  },
  placeholder: {
    opacity: 0.5,
  },
  clockIcon: {
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
  selectedTimeDisplay: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    alignItems: "center",
  },
  selectedTimeText: {
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
