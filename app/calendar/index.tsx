import { StyleSheet, View } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";

export default function CalendarScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <TextBox type="title1" style={styles.title}>
          캘린더
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          일정을 관리하고 달력으로 확인하는 앱입니다.
        </TextBox>
        <TextBox type="body3" style={styles.features}>
          주요 기능:
          {"\n"}• 월별/주별 달력 뷰{"\n"}• 일정 추가/수정/삭제
          {"\n"}• 날짜 선택 및 이벤트 처리
          {"\n"}• 로컬 데이터 저장
        </TextBox>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
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
  features: {
    textAlign: "left",
    fontSize: 16,
    lineHeight: 24,
  },
});
