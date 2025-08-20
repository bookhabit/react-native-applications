import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameScreen() {
  const router = useRouter() as any;

  const gameFeatures = [
    { title: '퀴즈 게임', icon: 'help-circle', route: '/(drawer)/application/basic/quiz', color: '#4CAF50', description: '다양한 퀴즈 문제' },
    { title: '틱택토', icon: 'grid', route: '/(drawer)/game/tictactoe', color: '#2196F3', description: '3x3 틱택토 게임' },
    { title: '메모리 게임', icon: 'card', route: '/(drawer)/game/memory', color: '#FF9800', description: '카드 짝 맞추기' },
    { title: '숫자 맞추기', icon: 'calculator', route: '/(drawer)/game/numberguess', color: '#9C27B0', description: '숫자 추측 게임' },
    { title: '단어 게임', icon: 'text', route: '/(drawer)/game/wordgame', color: '#E91E63', description: '단어 맞추기' },
    { title: '퍼즐', icon: 'grid', route: '/(drawer)/game/puzzle', color: '#607D8B', description: '슬라이딩 퍼즐' },
    { title: '리듬 게임', icon: 'musical-notes', route: '/(drawer)/game/rhythm', color: '#795548', description: '리듬에 맞춰 탭하기' },
    { title: '스네이크', icon: 'git-branch', route: '/(drawer)/game/snake', color: '#FF5722', description: '클래식 스네이크 게임' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.featureGrid}>
          {gameFeatures.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.featureItem, { backgroundColor: feature.color }]}
              onPress={() => router.push(feature.route)}
            >
              <Ionicons name={feature.icon as any} size={32} color="white" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: Colors.light.tint,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  featureDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});
