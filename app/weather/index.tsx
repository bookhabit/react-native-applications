import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function WeatherScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          날씨 정보
        </ThemedText>
        <ThemedText style={styles.description}>
          현재 위치의 날씨 정보를 확인하는 앱입니다.
        </ThemedText>
        <ThemedText style={styles.features}>
          주요 기능:
          {"\n"}• 위치 기반 날씨 정보
          {"\n"}• 실시간 날씨 업데이트
          {"\n"}• 일주일 날씨 예보
          {"\n"}• 위치 권한 관리
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
