import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function QuizHeroScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quiz Hero</Text>
        <Text style={styles.subtitle}>학습 퀴즈 앱</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>학습 퀴즈 앱</Text>
        <Text style={styles.description}>
          • Lottie 애니메이션 (정답/오답 효과){'\n'}
          • 증가 애니메이션 카운터{'\n'}
          • 스프링 애니메이션 버튼
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
    paddingTop: 60,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
    lineHeight: 24,
  },
});
