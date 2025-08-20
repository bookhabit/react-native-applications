import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WordGameScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>단어 게임</Text>
        <Text style={styles.subtitle}>단어 맞추기</Text>
        <Text style={styles.description}>
          • 주어진 힌트로 단어 추측{'\n'}
          • 글자 수와 위치 힌트{'\n'}
          • 다양한 카테고리의 단어
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
