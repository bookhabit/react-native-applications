import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  label?: string;
  options: SegmentedControlOption[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledSegmentedControlProps<T extends FieldValues>
  extends Omit<SegmentedControlProps, "selectedValue" | "onValueChange"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  disabled = false,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}
      <View style={styles.segmentedContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segment,
              index === 0 && styles.firstSegment,
              index === options.length - 1 && styles.lastSegment,
              selectedValue === option.value && styles.selectedSegment,
              disabled && styles.disabled,
            ]}
            onPress={() => !disabled && onValueChange(option.value)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <TextBox
              type="body1"
              style={[
                styles.segmentText,
                selectedValue === option.value && styles.selectedSegmentText,
              ]}
            >
              {option.label}
            </TextBox>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export function ControlledSegmentedControl<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledSegmentedControlProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <SegmentedControl
            {...props}
            selectedValue={value}
            onValueChange={onChange}
          />
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
  segmentedContainer: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    overflow: "hidden",
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  firstSegment: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  lastSegment: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  selectedSegment: {
    backgroundColor: "#007AFF",
  },
  segmentText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  selectedSegmentText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
