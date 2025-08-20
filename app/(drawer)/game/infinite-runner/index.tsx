import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function InfiniteRunnerScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TextBox type="title1" style={styles.title}>
          무한 러너
        </TextBox>
        <TextBox type="body1" style={styles.description}>
          장애물을 피해 최대한 멀리 달려보세요!
        </TextBox>
      </View>
      
      <View style={styles.gameArea}>
        <Ionicons name="person-running" size={80} color={Colors.light.tint} />
        <Text style={styles.comingSoon}>게임 개발 예정</Text>
        <Text style={styles.gameDescription}>
          점프와 회피로 장애물을 피하며 최고 거리를 달성하는 액션 게임입니다.
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
