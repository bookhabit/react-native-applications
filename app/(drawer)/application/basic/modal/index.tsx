import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";
import { CustomModal } from "@/components/ui";

export default function ModalScreen() {
  const [smallModalVisible, setSmallModalVisible] = React.useState(false);
  const [mediumModalVisible, setMediumModalVisible] = React.useState(false);
  const [largeModalVisible, setLargeModalVisible] = React.useState(false);
  const [formModalVisible, setFormModalVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const showSmallModal = () => setSmallModalVisible(true);
  const showMediumModal = () => setMediumModalVisible(true);
  const showLargeModal = () => setLargeModalVisible(true);
  const showFormModal = () => setFormModalVisible(true);

  const hideSmallModal = () => setSmallModalVisible(false);
  const hideMediumModal = () => setMediumModalVisible(false);
  const hideLargeModal = () => setLargeModalVisible(false);
  const hideFormModal = () => setFormModalVisible(false);

  const handleFormSubmit = () => {
    console.log("Form Data:", formData);
    hideFormModal();
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <TextBox type="title1" style={styles.title}>
          모달 테스트
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          다양한 크기와 기능의 모달을 테스트해보세요
        </TextBox>

        <View style={styles.section}>
          <TextBox type="title3" style={styles.sectionTitle}>
            모달 크기별 테스트
          </TextBox>

          <TouchableOpacity style={styles.button} onPress={showSmallModal}>
            <TextBox type="body1" style={styles.buttonText}>
              작은 모달 (Small)
            </TextBox>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={showMediumModal}
          >
            <TextBox type="body1" style={styles.buttonText}>
              중간 모달 (Medium)
            </TextBox>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={showLargeModal}
          >
            <TextBox type="body1" style={styles.buttonText}>
              큰 모달 (Large)
            </TextBox>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TextBox type="title3" style={styles.sectionTitle}>
            폼 모달 테스트
          </TextBox>
          <TouchableOpacity style={styles.button} onPress={showFormModal}>
            <TextBox type="body1" style={styles.buttonText}>
              폼 모달 열기
            </TextBox>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TextBox type="title3" style={styles.sectionTitle}>
            모달 특징
          </TextBox>
          <View style={styles.featureList}>
            <TextBox type="body2" style={styles.featureItem}>
              • 스케일 애니메이션
            </TextBox>
            <TextBox type="body2" style={styles.featureItem}>
              • 배경 터치로 닫기
            </TextBox>
            <TextBox type="body2" style={styles.featureItem}>
              • 닫기 버튼
            </TextBox>
            <TextBox type="body2" style={styles.featureItem}>
              • 크기별 반응형
            </TextBox>
            <TextBox type="body2" style={styles.featureItem}>
              • 그림자 효과
            </TextBox>
          </View>
        </View>
      </ScrollView>

      {/* 작은 모달 */}
      <CustomModal
        visible={smallModalVisible}
        title="작은 모달"
        onClose={hideSmallModal}
        size="small"
      >
        <View style={styles.modalContent}>
          <TextBox type="body1" style={styles.modalText}>
            이것은 작은 크기의 모달입니다.
          </TextBox>
          <TextBox type="body2" style={styles.modalSubtext}>
            간단한 알림이나 확인 메시지에 적합합니다.
          </TextBox>
        </View>
      </CustomModal>

      {/* 중간 모달 */}
      <CustomModal
        visible={mediumModalVisible}
        title="중간 모달"
        onClose={hideMediumModal}
        size="medium"
      >
        <View style={styles.modalContent}>
          <TextBox type="body1" style={styles.modalText}>
            이것은 중간 크기의 모달입니다.
          </TextBox>
          <TextBox type="body2" style={styles.modalSubtext}>
            더 많은 내용을 표시할 수 있습니다.
          </TextBox>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={hideMediumModal}
            >
              <TextBox type="body1" style={styles.modalButtonText}>
                확인
              </TextBox>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>

      {/* 큰 모달 */}
      <CustomModal
        visible={largeModalVisible}
        title="큰 모달"
        onClose={hideLargeModal}
        size="large"
      >
        <View style={styles.modalContent}>
          <TextBox type="body1" style={styles.modalText}>
            이것은 큰 크기의 모달입니다.
          </TextBox>
          <TextBox type="body2" style={styles.modalSubtext}>
            복잡한 폼이나 긴 내용을 표시할 수 있습니다.
          </TextBox>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={hideLargeModal}
            >
              <TextBox type="body1" style={styles.modalButtonText}>
                확인
              </TextBox>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>

      {/* 폼 모달 */}
      <CustomModal
        visible={formModalVisible}
        title="폼 모달"
        onClose={hideFormModal}
        size="medium"
      >
        <View style={styles.modalContent}>
          <View style={styles.formField}>
            <TextBox type="body1" style={styles.formLabel}>
              이름
            </TextBox>
            <TextInput
              style={styles.formInput}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="이름을 입력하세요"
            />
          </View>

          <View style={styles.formField}>
            <TextBox type="body1" style={styles.formLabel}>
              이메일
            </TextBox>
            <TextInput
              style={styles.formInput}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="이메일을 입력하세요"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formField}>
            <TextBox type="body1" style={styles.formLabel}>
              메시지
            </TextBox>
            <TextInput
              style={[styles.formInput, styles.formTextArea]}
              value={formData.message}
              onChangeText={(text) =>
                setFormData({ ...formData, message: text })
              }
              placeholder="메시지를 입력하세요"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleFormSubmit}
            >
              <TextBox type="body1" style={styles.modalButtonText}>
                제출
              </TextBox>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
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
  buttonMargin: {
    marginTop: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
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
  modalContent: {
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    marginBottom: 12,
  },
  modalSubtext: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  formField: {
    width: "100%",
    marginBottom: 16,
  },
  formLabel: {
    marginBottom: 8,
    fontWeight: "500",
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  formTextArea: {
    height: 100,
    textAlignVertical: "top",
  },
});
