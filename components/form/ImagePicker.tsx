import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { TextBox } from "@/components/atom/TextBox";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ImagePickerProps {
  label?: string;
  value?: string;
  onImageSelect: (imageUri: string) => void;
  onImageRemove?: () => void;
  disabled?: boolean;
  containerStyle?: any;
}

interface ControlledImagePickerProps<T extends FieldValues>
  extends Omit<ImagePickerProps, "value" | "onImageSelect"> {
  control: Control<T>;
  name: Path<T>;
  rules?: any;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  value,
  onImageSelect,
  onImageRemove,
  disabled = false,
  containerStyle,
}) => {
  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ExpoImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

    return {
      camera: cameraStatus === "granted",
      mediaLibrary: mediaLibraryStatus === "granted",
    };
  };

  const handleImageSelect = async () => {
    if (disabled) return;

    const permissions = await requestPermissions();

    if (!permissions.camera && !permissions.mediaLibrary) {
      Alert.alert(
        "권한 필요",
        "카메라와 갤러리 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요."
      );
      return;
    }

    Alert.alert("이미지 선택", "이미지를 선택하는 방법을 선택하세요", [
      {
        text: "카메라",
        onPress: () => handleCameraLaunch(permissions.camera),
      },
      {
        text: "갤러리",
        onPress: () => handleGalleryLaunch(permissions.mediaLibrary),
      },
      {
        text: "취소",
        style: "cancel",
      },
    ]);
  };

  const handleCameraLaunch = async (hasPermission: boolean) => {
    if (!hasPermission) {
      Alert.alert("권한 필요", "카메라 접근 권한이 필요합니다.");
      return;
    }

    try {
      const result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error("카메라 오류:", error);
      Alert.alert("오류", "카메라를 열 수 없습니다.");
    }
  };

  const handleGalleryLaunch = async (hasPermission: boolean) => {
    if (!hasPermission) {
      Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
      return;
    }

    try {
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error("갤러리 오류:", error);
      Alert.alert("오류", "갤러리를 열 수 없습니다.");
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextBox type="body1" style={styles.label}>
          {label}
        </TextBox>
      )}

      {value ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: value }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleImageRemove}
              disabled={disabled}
            >
              <TextBox type="body1" style={styles.removeButtonText}>
                ✕
              </TextBox>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleImageSelect}
              disabled={disabled}
            >
              <TextBox type="body3" style={styles.changeButtonText}>
                변경
              </TextBox>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.uploadButton, disabled && styles.disabled]}
          onPress={handleImageSelect}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <TextBox type="body1" style={styles.uploadIcon}>
            📷
          </TextBox>
          <TextBox type="body1" style={styles.uploadText}>
            이미지 선택
          </TextBox>
        </TouchableOpacity>
      )}

      {!value && (
        <TextBox type="body3" style={styles.helpText}>
          카메라로 촬영하거나 갤러리에서 선택할 수 있습니다
        </TextBox>
      )}
    </View>
  );
};

export function ControlledImagePicker<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: ControlledImagePickerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          <ImagePicker
            {...props}
            value={value}
            onImageSelect={onChange}
            onImageRemove={() => onChange("")}
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
  uploadButton: {
    height: 120,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
  },
  uploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  uploadText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.5,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  imageOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    gap: 8,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(0, 122, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  changeButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  helpText: {
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
