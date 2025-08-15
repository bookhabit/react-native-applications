import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";
import { ActionSheet } from "@/components/ui";

export default function ActionSheetScreen() {
  const [actionSheetVisible, setActionSheetVisible] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const actionSheetOptions = [
    { label: "사진 촬영", value: "camera" },
    { label: "갤러리에서 선택", value: "gallery" },
    { label: "파일 선택", value: "file" },
    { label: "삭제", value: "delete", destructive: true },
  ];

  const handleActionSheetSelect = (value: string) => {
    setSelectedOption(value);
    setActionSheetVisible(false);

    switch (value) {
      case "camera":
        Alert.alert("카메라", "카메라가 열립니다.");
        break;
      case "gallery":
        Alert.alert("갤러리", "갤러리가 열립니다.");
        break;
      case "file":
        Alert.alert("파일 선택", "파일 선택기가 열립니다.");
        break;
      case "delete":
        Alert.alert("삭제", "항목이 삭제됩니다.");
        break;
    }
  };

  const showActionSheet = () => {
    setActionSheetVisible(true);
  };

  const hideActionSheet = () => {
    setActionSheetVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <TextBox type="title1" style={styles.title}>
          액션시트 테스트
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          다양한 액션시트 옵션을 테스트해보세요
        </TextBox>

        <View style={styles.section}>
          <TextBox type="title3" style={styles.sectionTitle}>
            기본 액션시트
          </TextBox>
          <TouchableOpacity style={styles.button} onPress={showActionSheet}>
            <TextBox type="body1" style={styles.buttonText}>
              액션시트 열기
            </TextBox>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TextBox type="title3" style={styles.sectionTitle}>
            선택된 옵션
          </TextBox>
          <View style={styles.selectedContainer}>
            <TextBox type="body1" style={styles.selectedText}>
              {selectedOption
                ? `선택됨: ${selectedOption}`
                : "아직 선택되지 않음"}
            </TextBox>
          </View>
        </View>

        <View style={styles.section}>
          <TextBox type="title3" style={styles.sectionTitle}>
            액션시트 특징
          </TextBox>
          <View style={styles.featureList}>
            <TextBox type="body2" style={styles.featureItem}>
              • 하단에서 슬라이드 업 애니메이션
            </TextBox>
            <TextBox type="body2" style={styles.featureItem}>
              • 배경 터치로 닫기
            </TextBox>
            <TextBox type="body2" style={styles.featureItem}>
              • 취소 버튼으로 닫기
            </TextBox>
            <TextBox type="body2" style={styles.featureItem}>
              • Destructive 액션 (빨간색)
            </TextBox>
            <TextBox type="body2" style={styles.featureItem}>
              • iOS 스타일 디자인
            </TextBox>
          </View>
        </View>

        <View style={styles.section}>
          <TextBox type="title3" style={styles.sectionTitle}>
            사용 예시
          </TextBox>
          <View style={styles.exampleList}>
            <TextBox type="body2" style={styles.exampleItem}>
              • 이미지 업로드 선택
            </TextBox>
            <TextBox type="body2" style={styles.exampleItem}>
              • 메뉴 옵션 표시
            </TextBox>
            <TextBox type="body2" style={styles.exampleItem}>
              • 삭제 확인
            </TextBox>
            <TextBox type="body2" style={styles.exampleItem}>
              • 공유 옵션
            </TextBox>
          </View>
        </View>
      </ScrollView>

      <ActionSheet
        visible={actionSheetVisible}
        title="옵션 선택"
        options={actionSheetOptions}
        onSelect={handleActionSheetSelect}
        onCancel={hideActionSheet}
        cancelText="취소"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  selectedContainer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  selectedText: {
    textAlign: "center",
    fontWeight: "500",
  },
  featureList: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  featureItem: {
    marginBottom: 8,
    lineHeight: 20,
  },
  exampleList: {
    backgroundColor: "#F0F8FF",
    padding: 16,
    borderRadius: 12,
  },
  exampleItem: {
    marginBottom: 8,
    lineHeight: 20,
  },
});
