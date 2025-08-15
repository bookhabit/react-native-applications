import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledCheckboxProps<T extends FieldValues>
  extends Omit<CheckboxProps, "checked" | "onToggle"> {
  control: Control<T>;
  name: Path<T>;
  value: string;
  rules?: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onToggle,
  disabled = false,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => !disabled && onToggle(!checked)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: checked ? "#007AFF" : "#FFFFFF",
            borderColor: checked ? "#007AFF" : "#000000",
          },
          disabled && styles.disabled,
        ]}
      >
        {checked && (
          <TextBox type="body1" style={styles.checkmark}>
            ✓
          </TextBox>
        )}
      </View>
      <TextBox
        type="body1"
        style={[styles.label, disabled && styles.disabledText]}
      >
        {label}
      </TextBox>
    </TouchableOpacity>
  );
};

export function ControlledCheckbox<T extends FieldValues>({
  control,
  name,
  value,
  rules,
  ...props
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value: fieldValue } }) => {
        const isChecked =
          Array.isArray(fieldValue) && fieldValue.includes(value);

        const handleToggle = (checked: boolean) => {
          if (Array.isArray(fieldValue)) {
            if (checked) {
              onChange([...fieldValue, value]);
            } else {
              onChange(fieldValue.filter((item: string) => item !== value));
            }
          } else {
            onChange(checked ? [value] : []);
          }
        };

        return (
          <Checkbox {...props} checked={isChecked} onToggle={handleToggle} />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});
