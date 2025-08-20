import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SudokuScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TextBox type="title1" style={styles.title}>
          스도쿠
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          9x9 격자에 숫자를 채워보세요!
        </TextBox>
      </View>
      
      <View style={styles.gameArea}>
        <Ionicons name="grid" size={80} color={Colors.light.tint} />
        <Text style={styles.comingSoon}>게임 개발 예정</Text>
        <Text style={styles.gameDescription}>
          1-9 숫자를 각 행, 열, 3x3 박스에 중복 없이 배치하는 논리 퍼즐입니다.
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
