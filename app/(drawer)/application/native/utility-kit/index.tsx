import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function UtilityKitScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Utility Kit</Text>
        <Text style={styles.subtitle}>알림 & 유틸 모음 앱</Text>
        <Text style={styles.description}>
          • expo-notifications (로컬 알림){'\n'}
          • expo-haptics (진동/햅틱){'\n'}
          • expo-clipboard (복사/붙여넣기){'\n'}
          • expo-speech (음성 읽기){'\n'}
          • expo-sharing (파일 공유)
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
