import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { TextBox } from "@/components/atom/TextBox";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    switch (variant) {
      case "primary":
        return [...baseStyle, { backgroundColor: "#007AFF" }];
      case "secondary":
        return [
          ...baseStyle,
          {
            backgroundColor: "#FFFFFF",
            borderColor: "#007AFF",
            borderWidth: 1,
          },
        ];
      case "outline":
        return [
          ...baseStyle,
          {
            backgroundColor: "transparent",
            borderColor: "#000000",
            borderWidth: 1,
          },
        ];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return [styles.text, { color: "#FFFFFF" }];
      case "secondary":
        return [styles.text, { color: "#007AFF" }];
      case "outline":
        return [styles.text, { color: "#000000" }];
      default:
        return [styles.text, { color: "#000000" }];
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        (disabled || loading) && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFFFFF" : "#007AFF"}
          size="small"
        />
      ) : (
        <TextBox type="button1" style={getTextStyle()}>
          {title}
        </TextBox>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  small: {
    height: 36,
    paddingHorizontal: 16,
  },
  medium: {
    height: 48,
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
    paddingHorizontal: 32,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
});
