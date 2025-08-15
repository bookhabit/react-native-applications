import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledRadioButtonProps<T extends FieldValues>
  extends Omit<RadioButtonProps, "selected" | "onSelect"> {
  control: Control<T>;
  name: Path<T>;
  value: string;
  rules?: any;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onSelect,
  disabled = false,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => !disabled && onSelect()}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.radio,
          {
            borderColor: selected ? "#007AFF" : "#000000",
          },
          disabled && styles.disabled,
        ]}
      >
        {selected && (
          <View style={[styles.radioInner, { backgroundColor: "#007AFF" }]} />
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

export function ControlledRadioButton<T extends FieldValues>({
  control,
  name,
  value,
  rules,
  ...props
}: ControlledRadioButtonProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value: fieldValue } }) => (
        <RadioButton
          {...props}
          selected={fieldValue === value}
          onSelect={() => onChange(value)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
