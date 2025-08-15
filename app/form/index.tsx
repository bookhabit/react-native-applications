import React from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";
import { useForm } from "react-hook-form";
import {
  ControlledTextInput,
  ControlledTextArea,
  Button,
  ControlledCheckbox,
  ControlledRadioButton,
  ControlledSwitch,
} from "@/components/form";
import { FormData } from "@/types/form";

export default function FormScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      gender: "" as "male" | "female" | "other",
      interests: [],
      notifications: false,
      terms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    Alert.alert("성공!", "폼이 성공적으로 제출되었습니다.", [{ text: "확인" }]);
    console.log("Form Data:", data);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <TextBox type="title1" style={styles.title}>
          Form 시스템
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          다양한 입력 컴포넌트와 유효성 검사를 체험하세요
        </TextBox>

        <View style={styles.formContainer}>
          <ControlledTextInput
            control={control}
            name="name"
            label="이름"
            placeholder="이름을 입력하세요"
            rules={{ required: "이름을 입력해주세요" }}
          />

          <ControlledTextInput
            control={control}
            name="email"
            label="이메일"
            placeholder="이메일을 입력하세요"
            keyboardType="email-address"
            autoCapitalize="none"
            rules={{
              required: "이메일을 입력해주세요",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "올바른 이메일 형식을 입력해주세요",
              },
            }}
          />

          <ControlledTextArea
            control={control}
            name="message"
            label="메시지"
            placeholder="메시지를 입력하세요"
            rows={4}
            rules={{ required: "메시지를 입력해주세요" }}
          />

          <View style={styles.section}>
            <TextBox type="body1" style={styles.sectionTitle}>
              성별
            </TextBox>
            <ControlledRadioButton
              control={control}
              name="gender"
              value="male"
              label="남성"
              rules={{ required: "성별을 선택해주세요" }}
            />
            <ControlledRadioButton
              control={control}
              name="gender"
              value="female"
              label="여성"
            />
            <ControlledRadioButton
              control={control}
              name="gender"
              value="other"
              label="기타"
            />
            {errors.gender && (
              <TextBox style={styles.errorText}>
                {errors.gender.message}
              </TextBox>
            )}
          </View>

          <View style={styles.section}>
            <TextBox type="body1" style={styles.sectionTitle}>
              관심사
            </TextBox>
            <ControlledCheckbox
              control={control}
              name="interests"
              value="programming"
              label="프로그래밍"
              rules={{ required: "관심사를 하나 이상 선택해주세요" }}
            />
            <ControlledCheckbox
              control={control}
              name="interests"
              value="design"
              label="디자인"
            />
            <ControlledCheckbox
              control={control}
              name="interests"
              value="marketing"
              label="마케팅"
            />
            <ControlledCheckbox
              control={control}
              name="interests"
              value="business"
              label="비즈니스"
            />
            {errors.interests && (
              <TextBox style={styles.errorText}>
                {errors.interests.message}
              </TextBox>
            )}
          </View>

          <ControlledSwitch
            control={control}
            name="notifications"
            label="알림 받기"
          />

          <ControlledCheckbox
            control={control}
            name="terms"
            value="terms"
            label="이용약관에 동의합니다"
            rules={{ required: "이용약관에 동의해주세요" }}
          />
          {errors.terms && (
            <TextBox style={styles.errorText}>{errors.terms.message}</TextBox>
          )}

          <View style={styles.buttonContainer}>
            <Button
              title="폼 제출"
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              size="large"
            />
          </View>
        </View>
      </ScrollView>
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
  formContainer: {
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 20,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 4,
  },
});
