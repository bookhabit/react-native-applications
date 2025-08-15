import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function GalleryScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          이미지 갤러리
        </ThemedText>
        <ThemedText style={styles.description}>
          이미지를 업로드하고 관리하는 앱입니다.
        </ThemedText>
        <ThemedText style={styles.features}>
          주요 기능:
          {"\n"}• 이미지 업로드 및 미리보기
          {"\n"}• 썸네일 렌더링
          {"\n"}• 이미지 삭제 및 관리
          {"\n"}• 로컬 저장소 연동
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
