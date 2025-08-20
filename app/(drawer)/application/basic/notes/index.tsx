import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View } from "react-native";

export default function NotesScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <TextBox type="title1" style={styles.title}>
          메모장
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          제목과 내용을 포함한 메모를 작성하는 앱입니다.
        </TextBox>
        <TextBox type="body3" style={styles.features}>
          주요 기능:
          {"\n"}• 메모 작성/수정/삭제
          {"\n"}• 제목과 내용 분리
          {"\n"}• 메모 검색 기능
          {"\n"}• 로컬 저장소 연동
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
