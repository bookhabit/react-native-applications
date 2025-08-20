import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RouletteScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TextBox type="title1" style={styles.title}>
          룰렛 복불복
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          회전판을 돌려서 당첨을 확인해보세요!
        </TextBox>
      </View>
      
      <View style={styles.gameArea}>
        <Ionicons name="disc" size={80} color={Colors.light.tint} />
        <Text style={styles.comingSoon}>게임 개발 예정</Text>
        <Text style={styles.gameDescription}>
          원형 룰렛을 회전시켜 랜덤한 결과를 확인하는 복불복 게임입니다.
        </Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  gameArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  comingSoon: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginTop: 20,
    marginBottom: 15,
  },
  gameDescription: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
