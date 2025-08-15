import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
} from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface PickerOption {
  label: string;
  value: string;
}

interface PickerProps {
  label?: string;
  placeholder?: string;
  options: PickerOption[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledPickerProps<T extends FieldValues>
  extends Omit<PickerProps, "selectedValue" | "onValueChange"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const Picker: React.FC<PickerProps> = ({
  label,
  placeholder = "선택해주세요",
  options,
  selectedValue,
  onValueChange,
  disabled = false,
  containerStyle,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}
      <TouchableOpacity
        style={[styles.pickerButton, disabled && styles.disabled]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <TextBox
          type="body1"
          style={[styles.pickerText, !selectedOption && styles.placeholder]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </TextBox>
        <TextBox type="body1" style={styles.arrow}>
          ▼
        </TextBox>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TextBox type="title4" style={styles.modalTitle}>
                {label || "선택"}
              </TextBox>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <TextBox type="body1">✕</TextBox>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedValue === item.value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <TextBox
                    type="body1"
                    style={[
                      styles.optionText,
                      selectedValue === item.value && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </TextBox>
                  {selectedValue === item.value && (
                    <TextBox type="body1" style={styles.checkmark}>
                      ✓
                    </TextBox>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export function ControlledPicker<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledPickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Picker {...props} selectedValue={value} onValueChange={onChange} />
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
  pickerButton: {
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
  pickerText: {
    flex: 1,
  },
  placeholder: {
    opacity: 0.5,
  },
  arrow: {
    fontSize: 12,
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontWeight: "600",
  },
  closeButton: {
    padding: 8,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  selectedOption: {
    backgroundColor: "#F0F8FF",
  },
  optionText: {
    flex: 1,
  },
  selectedOptionText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  checkmark: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
