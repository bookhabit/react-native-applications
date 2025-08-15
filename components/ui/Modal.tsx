import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal as RNModal,
  Animated,
  Dimensions,
} from "react-native";
import { TextBox } from "@/components/atom/TextBox";

interface CustomModalProps {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
  closeText?: string;
  size?: "small" | "medium" | "large";
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  children,
  onClose,
  showCloseButton = true,
  closeText = "닫기",
  size = "medium",
}) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleAnim, fadeAnim]);

  const getModalWidth = () => {
    switch (size) {
      case "small":
        return screenWidth * 0.8;
      case "large":
        return screenWidth * 0.95;
      default:
        return screenWidth * 0.9;
    }
  };

  const getModalHeight = () => {
    switch (size) {
      case "small":
        return screenHeight * 0.4;
      case "large":
        return screenHeight * 0.8;
      default:
        return screenHeight * 0.6;
    }
  };

  if (!visible) return null;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.container,
            {
              width: getModalWidth(),
              maxHeight: getModalHeight(),
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {title && (
            <View style={styles.header}>
              <TextBox type="title3" style={styles.title}>
                {title}
              </TextBox>
              {showCloseButton && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <TextBox type="title4" style={styles.closeIcon}>
                    ✕
                  </TextBox>
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={styles.content}>{children}</View>

          {!title && showCloseButton && (
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.closeTextButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <TextBox type="body1" style={styles.closeText}>
                  {closeText}
                </TextBox>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    flex: 1,
    fontWeight: "600",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    color: "#666666",
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    alignItems: "center",
  },
  closeTextButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
