import React from "react";
import { TextInput, StyleSheet, View, TextInputProps } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface TextAreaProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
  rows?: number;
}

interface ControlledTextAreaProps<T extends FieldValues>
  extends Omit<TextAreaProps, "value" | "onChangeText"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  containerStyle,
  style,
  rows = 4,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}
      <TextInput
        style={[
          styles.textArea,
          {
            height: rows * 24 + 24, // 24px per row + padding
          },
          style,
        ]}
        multiline
        textAlignVertical="top"
        {...props}
      />
      {error && (
        <TextBox type="body3" style={styles.errorText}>
          {error}
        </TextBox>
      )}
    </View>
  );
};

export function ControlledTextArea<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledTextAreaProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextArea
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
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
