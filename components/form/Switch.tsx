import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SwitchProps {
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledSwitchProps<T extends FieldValues>
  extends Omit<SwitchProps, "value" | "onToggle"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  value,
  onToggle,
  disabled = false,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextBox
        type="body1"
        style={[styles.label, disabled && styles.disabledText]}
      >
        {label}
      </TextBox>
      <TouchableOpacity
        style={[
          styles.track,
          {
            backgroundColor: value ? "#007AFF" : "#FFFFFF",
            borderColor: "#000000",
          },
          disabled && styles.disabled,
        ]}
        onPress={() => !disabled && onToggle(!value)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.thumb,
            {
              backgroundColor: "#FFFFFF",
              transform: [{ translateX: value ? 20 : 2 }],
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export function ControlledSwitch<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Switch {...props} value={value} onToggle={onChange} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});
