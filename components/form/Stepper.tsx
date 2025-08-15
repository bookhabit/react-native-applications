import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface StepperProps {
  label?: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledStepperProps<T extends FieldValues>
  extends Omit<StepperProps, "value" | "onValueChange"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const Stepper: React.FC<StepperProps> = ({
  label,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  disabled = false,
  containerStyle,
}) => {
  const handleIncrement = () => {
    if (disabled) return;
    const newValue = Math.min(maximumValue, value + step);
    onValueChange(newValue);
  };

  const handleDecrement = () => {
    if (disabled) return;
    const newValue = Math.max(minimumValue, value - step);
    onValueChange(newValue);
  };

  const isMinDisabled = value <= minimumValue || disabled;
  const isMaxDisabled = value >= maximumValue || disabled;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}

      <View style={styles.stepperContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.decrementButton,
            isMinDisabled && styles.disabledButton,
          ]}
          onPress={handleDecrement}
          disabled={isMinDisabled}
          activeOpacity={0.7}
        >
          <TextBox
            type="title4"
            style={[
              styles.buttonText,
              isMinDisabled && styles.disabledButtonText,
            ]}
          >
            -
          </TextBox>
        </TouchableOpacity>

        <View style={styles.valueContainer}>
          <TextBox type="title3" style={styles.value}>
            {value}
          </TextBox>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            styles.incrementButton,
            isMaxDisabled && styles.disabledButton,
          ]}
          onPress={handleIncrement}
          disabled={isMaxDisabled}
          activeOpacity={0.7}
        >
          <TextBox
            type="title4"
            style={[
              styles.buttonText,
              isMaxDisabled && styles.disabledButtonText,
            ]}
          >
            +
          </TextBox>
        </TouchableOpacity>
      </View>

      <View style={styles.rangeContainer}>
        <TextBox type="body3" style={styles.rangeText}>
          범위: {minimumValue} - {maximumValue} (단계: {step})
        </TextBox>
      </View>
    </View>
  );
};

export function ControlledStepper<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledStepperProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <Stepper {...props} value={value} onValueChange={onChange} />
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
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  decrementButton: {
    backgroundColor: "#FF6B6B",
  },
  incrementButton: {
    backgroundColor: "#4CAF50",
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#9E9E9E",
  },
  valueContainer: {
    width: 80,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  value: {
    fontWeight: "600",
    color: "#000000",
  },
  rangeContainer: {
    alignItems: "center",
  },
  rangeText: {
    opacity: 0.7,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
