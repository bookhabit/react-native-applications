import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [show, setShow] = React.useState(false);

  const formatDate = (date: Date) => {
    if (mode === "time") {
      return date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
    if (mode === "datetime") {
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const showPicker = () => {
    if (!disabled) {
      setShow(true);
    }
  };

  const getIcon = () => {
    switch (mode) {
      case "time":
        return "🕐";
      case "datetime":
        return "📅🕐";
      default:
        return "📅";
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
        style={[styles.dateButton, disabled && styles.disabled]}
        onPress={showPicker}
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
          {getIcon()}
        </TextBox>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          style={styles.picker}
          locale="ko-KR"
          is24Hour={true}
          maximumDate={new Date(2100, 11, 31)}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
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
