
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CookExplorerScreen() {
  return (
    <ThemedView style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          • 이미지 슬라이드 애니메이션{'\n'}
          • Swipe 제스처 (Tinder 스타일){'\n'}
          • 스프링 애니메이션 카드
        </Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
    lineHeight: 24,
  },
});
