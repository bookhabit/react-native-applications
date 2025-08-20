import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TicTacToeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>틱택토</Text>
        <Text style={styles.subtitle}>3x3 틱택토 게임</Text>
        <Text style={styles.description}>
          • X와 O로 번갈아가며 플레이{'\n'}
          • 가로, 세로, 대각선 3개 연속{'\n'}
          • 승리 조건 달성 시 게임 종료
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
