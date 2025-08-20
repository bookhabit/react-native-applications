import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Game2048Screen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TextBox type="title1" style={styles.title}>
          2048 퍼즐
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          숫자를 합쳐서 2048을 만들어보세요!
        </TextBox>
      </View>
      
      <View style={styles.gameArea}>
        <Ionicons name="grid" size={80} color={Colors.light.tint} />
        <Text style={styles.comingSoon}>게임 개발 예정</Text>
        <Text style={styles.gameDescription}>
          스와이프로 숫자 블록을 합치고 2048을 달성하는 퍼즐 게임입니다.
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
