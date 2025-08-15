import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function MoviesScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          영화 검색
        </ThemedText>
        <ThemedText style={styles.description}>
          영화를 검색하고 즐겨찾기에 추가하는 앱입니다.
        </ThemedText>
        <ThemedText style={styles.features}>
          주요 기능:
          {"\n"}• 영화 검색 및 목록 표시
          {"\n"}• 영화 상세 정보 보기
          {"\n"}• 즐겨찾기 추가/제거
          {"\n"}• 검색 최적화 (디바운싱)
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
