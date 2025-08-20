import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TravelDreamsScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Travel Dreams</Text>
        <Text style={styles.subtitle}>여행 버킷리스트 앱</Text>
        <Text style={styles.description}>
          • 말풍선 튀어나오는 애니메이션{'\n'}
          • Lottie 애니메이션 (비행기/지구본){'\n'}
          • Swipe 제스처 카드 넘기기
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
