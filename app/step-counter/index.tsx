import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function StepCounterScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          만보기
        </ThemedText>
        <ThemedText style={styles.description}>
          걸음 수를 측정하고 목표를 달성하는 앱입니다.
        </ThemedText>
        <ThemedText style={styles.features}>
          주요 기능:
          {"\n"}• 가속도 센서 데이터 읽기
          {"\n"}• 실시간 걸음 수 계산
          {"\n"}• 목표 설정 및 알림
          {"\n"}• 데이터 저장 및 통계
        </ThemedText>
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
