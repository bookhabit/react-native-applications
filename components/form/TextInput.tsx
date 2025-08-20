import { TextBox } from "@/components/atom/TextBox";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

interface ControlledTextInputProps<T extends FieldValues>
  extends Omit<CustomTextInputProps, "value" | "onChangeText"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}
      <RNTextInput style={[styles.input, style]} {...props} />
      {error && (
        <TextBox type="body3" style={styles.errorText}>
          {error}
        </TextBox>
      )}
    </View>
  );
};

export function ControlledTextInput<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledTextInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          {...props}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
