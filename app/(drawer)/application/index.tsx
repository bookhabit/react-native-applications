import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ApplicationScreen() {
  const router = useRouter() as any;

  const appFeatures = [
    // 기본 앱 기능
    { title: '할 일 관리', icon: 'checkmark-circle', route: '/todo', color: '#4CAF50', category: '기본 앱' },
    { title: '날씨 확인', icon: 'partly-sunny', route: '/weather', color: '#2196F3', category: '기본 앱' },
    { title: '메모 작성', icon: 'document-text', route: '/notes', color: '#FF9800', category: '기본 앱' },
    { title: '채팅', icon: 'chatbubbles', route: '/chat', color: '#9C27B0', category: '기본 앱' },
    { title: '영화 정보', icon: 'film', route: '/movies', color: '#E91E63', category: '기본 앱' },
    { title: '캘린더', icon: 'calendar', route: '/calendar', color: '#607D8B', category: '기본 앱' },
    { title: '갤러리', icon: 'images', route: '/gallery', color: '#795548', category: '기본 앱' },
    { title: '쇼핑', icon: 'cart', route: '/shop', color: '#FF5722', category: '기본 앱' },
    { title: '폼 예제', icon: 'list', route: '/form', color: '#3F51B5', category: '기본 앱' },
    { title: '액션 시트', icon: 'menu', route: '/action-sheet', color: '#009688', category: '기본 앱' },
    { title: '모달', icon: 'square', route: '/modal', color: '#FFC107', category: '기본 앱' },
    
    // 네이티브 기능
    { title: '카메라', icon: 'camera', route: '/camera', color: '#4CAF50', category: '네이티브' },
    { title: '위치 서비스', icon: 'location', route: '/location', color: '#2196F3', category: '네이티브' },
    { title: '푸시 알림', icon: 'notifications', route: '/notifications', color: '#FF9800', category: '네이티브' },
    { title: '생체 인증', icon: 'finger-print', route: '/biometrics', color: '#9C27B0', category: '네이티브' },
    
    // 애니메이션
    { title: '페이드 애니메이션', icon: 'eye', route: '/fade', color: '#E91E63', category: '애니메이션' },
    { title: '슬라이드 애니메이션', icon: 'arrow-forward', route: '/slide', color: '#607D8B', category: '애니메이션' },
    { title: '스케일 애니메이션', icon: 'resize', route: '/scale', color: '#795548', category: '애니메이션' },
    { title: '회전 애니메이션', icon: 'refresh', route: '/rotate', color: '#FF5722', category: '애니메이션' },
  ];

  const categories = ['기본 앱', '네이티브', '애니메이션'];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>다양한 앱 기능들을 체험해보세요</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.featureGrid}>
              {appFeatures
                .filter(feature => feature.category === category)
                .map((feature, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.featureItem, { backgroundColor: feature.color }]}
                    onPress={() => router.push(feature.route)}
                  >
                    <Ionicons name={feature.icon as any} size={28} color="white" />
                    <Text style={styles.featureTitle}>{feature.title}</Text>
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
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.text,
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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
});
