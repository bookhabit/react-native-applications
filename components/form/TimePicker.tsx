import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [show, setShow] = React.useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedTime) {
      onTimeChange(selectedTime);
    }
  };

  const showPicker = () => {
    if (!disabled) {
      setShow(true);
    }
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
        onPress={showPicker}
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

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
          style={styles.picker}
          locale="ko-KR"
          is24Hour={true}
        />
      )}
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
  picker: {
    width: Platform.OS === "ios" ? "100%" : 0,
    height: Platform.OS === "ios" ? 200 : 0,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
