import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TripLoggerScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Trip Logger</Text>
        <Text style={styles.subtitle}>여행 메모 앱</Text>
        <Text style={styles.description}>
          • expo-location으로 현재 위치{'\n'}
          • react-native-maps로 지도 마커{'\n'}
          • 위치 기록을 SQLite에 저장
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
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
    textAlign: 'center',
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
