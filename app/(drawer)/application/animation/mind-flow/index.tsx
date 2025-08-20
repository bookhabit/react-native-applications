import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MindFlowScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>MindFlow</Text>
        <Text style={styles.subtitle}>명상/습관 트래커 앱</Text>
        <Text style={styles.description}>
          • 증가 애니메이션 카운터{'\n'}
          • 스프링 애니메이션{'\n'}
          • 이미지 슬라이드 애니메이션{'\n'}
          • Lottie 애니메이션 (호흡 가이드)
        </Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: Colors.light.tint,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
    lineHeight: 24,
  },
});
