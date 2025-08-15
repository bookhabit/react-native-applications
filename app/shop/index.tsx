import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ShopScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          쇼핑몰
        </ThemedText>
        <ThemedText style={styles.description}>
          상품을 둘러보고 장바구니에 담는 앱입니다.
        </ThemedText>
        <ThemedText style={styles.features}>
          주요 기능:
          {"\n"}• 상품 목록 및 상세 정보
          {"\n"}• 장바구니 상태 관리
          {"\n"}• 수량 변경 및 가격 계산
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
