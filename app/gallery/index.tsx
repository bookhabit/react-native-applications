import { StyleSheet, View } from "react-native";
import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";

export default function GalleryScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <TextBox type="title1" style={styles.title}>
          이미지 갤러리
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          이미지를 업로드하고 관리하는 앱입니다.
        </TextBox>
        <TextBox type="body3" style={styles.features}>
          주요 기능:
          {"\n"}• 이미지 업로드 및 미리보기
          {"\n"}• 썸네일 렌더링
          {"\n"}• 이미지 삭제 및 관리
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
