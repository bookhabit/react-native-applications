import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameScreen() {
  const router = useRouter() as any;

  const gameFeatures = [
    // 퍼즐/기억력 게임
    { title: '2048 퍼즐', icon: 'grid', route: '/(drawer)/game/2048', color: '#4CAF50', description: '숫자 합치기 퍼즐', category: '퍼즐' },
    { title: '스도쿠', icon: 'grid', route: '/(drawer)/game/sudoku', color: '#8BC34A', description: '9x9 숫자 퍼즐', category: '퍼즐' },
    { title: '메모리 게임', icon: 'card', route: '/(drawer)/game/memory', color: '#FF9800', description: '카드 짝 맞추기', category: '퍼즐' },
    { title: '슬라이딩 퍼즐', icon: 'grid', route: '/(drawer)/game/puzzle', color: '#607D8B', description: '블록 이동 퍼즐', category: '퍼즐' },
    
    // 액션/점프/러너 게임
    { title: '무한 러너', icon: 'person-running', route: '/(drawer)/game/infinite-runner', color: '#E91E63', description: '장애물 피해 달리기', category: '액션' },
    { title: '점프 게임', icon: 'arrow-up', route: '/(drawer)/game/jump-game', color: '#9C27B0', description: '점프로 장애물 회피', category: '액션' },
    { title: '피하기 게임', icon: 'move', route: '/(drawer)/game/avoid-game', color: '#FF5722', description: '움직이며 장애물 회피', category: '액션' },
    
    // 물리 기반/캐주얼 게임
    { title: '브릭 브레이커', icon: 'basketball', route: '/(drawer)/game/brick-breaker', color: '#795548', description: '공으로 블록 파괴', category: '물리' },
    { title: '핑퐁', icon: 'tennisball', route: '/(drawer)/game/pong', color: '#00BCD4', description: '클래식 핑퐁 게임', category: '물리' },
    { title: '스네이크', icon: 'git-branch', route: '/(drawer)/game/snake', color: '#4CAF50', description: '클래식 스네이크 게임', category: '물리' },
    { title: '미니 골프', icon: 'golf', route: '/(drawer)/game/mini-golf', color: '#8BC34A', description: '공을 홀에 넣기', category: '물리' },
    { title: '볼링', icon: 'bowling-ball', route: '/(drawer)/game/bowling', color: '#FF9800', description: '핀을 쓰러뜨리기', category: '물리' },
    
    // 실시간/멀티플레이 게임
    { title: '온라인 틱택토', icon: 'grid', route: '/(drawer)/game/online-tictactoe', color: '#2196F3', description: '실시간 대결', category: '멀티' },
    { title: '퀴즈 챌린지', icon: 'help-circle', route: '/(drawer)/game/quiz-challenge', color: '#FF9800', description: '실시간 퀴즈 대결', category: '멀티' },
    { title: '가위바위보', icon: 'hand-left', route: '/(drawer)/game/rock-paper-scissors', color: '#9C27B0', description: '실시간 배틀', category: '멀티' },
    
    // 복불복 게임
    { title: '룰렛', icon: 'disc', route: '/(drawer)/game/roulette', color: '#E91E63', description: '회전판 복불복', category: '복불복' },
    { title: '컵 뒤집기', icon: 'wine', route: '/(drawer)/game/cup-trick', color: '#FF9800', description: '공 숨기기 트릭', category: '복불복' },
    { title: '달리기 경주', icon: 'flag', route: '/(drawer)/game/race-game', color: '#4CAF50', description: '캐릭터 경주', category: '복불복' },
    { title: '달팽이 경주', icon: 'leaf', route: '/(drawer)/game/snail-race', color: '#8BC34A', description: '느린 경주', category: '복불복' },
    { title: '상자 열기', icon: 'cube', route: '/(drawer)/game/box-opening', color: '#795548', description: '랜덤 아이템', category: '복불복' },
    { title: '스크래치 복권', icon: 'card', route: '/(drawer)/game/scratch-lottery', color: '#FF5722', description: '긁어서 당첨 확인', category: '복불복' },
    { title: '밧줄 오르기', icon: 'trending-up', route: '/(drawer)/game/rope-climbing', color: '#00BCD4', description: '밧줄 타고 올라가기', category: '복불복' },
    
    // 기존 게임들
    { title: '틱택토', icon: 'grid', route: '/(drawer)/game/tictactoe', color: '#2196F3', description: '3x3 틱택토 게임', category: '기존' },
    { title: '숫자 맞추기', icon: 'calculator', route: '/(drawer)/game/numberguess', color: '#9C27B0', description: '숫자 추측 게임', category: '기존' },
    { title: '단어 게임', icon: 'text', route: '/(drawer)/game/wordgame', color: '#E91E63', description: '단어 맞추기', category: '기존' },
    { title: '리듬 게임', icon: 'musical-notes', route: '/(drawer)/game/rhythm', color: '#795548', description: '리듬에 맞춰 탭하기', category: '기존' },
  ];

  const categories = ['퍼즐', '액션', '물리', '멀티', '복불복', '기존'];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.featureGrid}>
              {gameFeatures
                .filter(feature => feature.category === category)
                .map((feature, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.featureItem, { backgroundColor: feature.color }]}
                    onPress={() => router.push(feature.route)}
                  >
                    <Ionicons name={feature.icon as any} size={28} color="white" />
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        ))}
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
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
});
