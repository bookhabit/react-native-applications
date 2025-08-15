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
  ControlledPicker,
  ControlledSegmentedControl,
  ControlledDatePicker,
  ControlledTimePicker,
  ControlledSlider,
  ControlledStepper,
  ControlledImagePicker,
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
      category: "",
      priority: "medium",
      birthDate: new Date(),
      birthTime: new Date(),
      age: 25,
      rating: 5,
      quantity: 1,
      profileImage: "",
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

          <View style={styles.section}>
            <TextBox type="body1" style={styles.sectionTitle}>
              카테고리 선택
            </TextBox>
            <ControlledPicker
              control={control}
              name="category"
              label="카테고리"
              options={[
                { label: "기술", value: "tech" },
                { label: "디자인", value: "design" },
                { label: "마케팅", value: "marketing" },
                { label: "비즈니스", value: "business" },
              ]}
              rules={{ required: "카테고리를 선택해주세요" }}
            />
          </View>

          <View style={styles.section}>
            <TextBox type="body1" style={styles.sectionTitle}>
              우선순위
            </TextBox>
            <ControlledSegmentedControl
              control={control}
              name="priority"
              options={[
                { label: "낮음", value: "low" },
                { label: "보통", value: "medium" },
                { label: "높음", value: "high" },
              ]}
            />
          </View>

          <ControlledDatePicker
            control={control}
            name="birthDate"
            label="생년월일"
            mode="date"
          />

          <ControlledTimePicker
            control={control}
            name="birthTime"
            label="출생 시간"
          />

          <View style={styles.section}>
            <TextBox type="body1" style={styles.sectionTitle}>
              나이
            </TextBox>
            <ControlledStepper
              control={control}
              name="age"
              minimumValue={1}
              maximumValue={100}
              step={1}
            />
          </View>

          <View style={styles.section}>
            <TextBox type="body1" style={styles.sectionTitle}>
              만족도
            </TextBox>
            <ControlledSlider
              control={control}
              name="rating"
              minimumValue={1}
              maximumValue={5}
              step={0.5}
            />
          </View>

          <View style={styles.section}>
            <TextBox type="body1" style={styles.sectionTitle}>
              수량
            </TextBox>
            <ControlledStepper
              control={control}
              name="quantity"
              minimumValue={1}
              maximumValue={10}
              step={1}
            />
          </View>

          <ControlledImagePicker
            control={control}
            name="profileImage"
            label="프로필 이미지"
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
