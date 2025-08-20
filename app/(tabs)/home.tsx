import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeTab() {
  const router = useRouter();

  const menuItems = [
    // 기본 앱 기능
    { title: '할 일 관리', icon: 'checkmark-circle', route: '/todo', color: '#4CAF50' },
    { title: '날씨 확인', icon: 'partly-sunny', route: '/weather', color: '#2196F3' },
    { title: '메모 작성', icon: 'document-text', route: '/notes', color: '#FF9800' },
    { title: '채팅', icon: 'chatbubbles', route: '/chat', color: '#9C27B0' },
    { title: '영화 정보', icon: 'film', route: '/movies', color: '#E91E63' },
    { title: '캘린더', icon: 'calendar', route: '/calendar', color: '#607D8B' },
    { title: '갤러리', icon: 'images', route: '/gallery', color: '#795548' },
    { title: '쇼핑', icon: 'cart', route: '/shop', color: '#FF5722' },
    { title: '폼 예제', icon: 'list', route: '/form', color: '#3F51B5' },
    { title: '액션 시트', icon: 'menu', route: '/action-sheet', color: '#009688' },
    { title: '모달', icon: 'square', route: '/modal', color: '#FFC107' },
    
    // 네이티브 기능
    { title: '카메라', icon: 'camera', route: '/camera', color: '#4CAF50' },
    { title: '위치 서비스', icon: 'location', route: '/location', color: '#2196F3' },
    { title: '푸시 알림', icon: 'notifications', route: '/notifications', color: '#FF9800' },
    { title: '생체 인증', icon: 'finger-print', route: '/biometrics', color: '#9C27B0' },
    
    // 애니메이션
    { title: '페이드 애니메이션', icon: 'eye', route: '/fade', color: '#E91E63' },
    { title: '슬라이드 애니메이션', icon: 'arrow-forward', route: '/slide', color: '#607D8B' },
    { title: '스케일 애니메이션', icon: 'resize', route: '/scale', color: '#795548' },
    { title: '회전 애니메이션', icon: 'refresh', route: '/rotate', color: '#FF5722' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>앱 갤러리</Text>
        <Text style={styles.subtitle}>다양한 기능들을 체험해보세요</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: item.color }]}
              onPress={() => router.push(item.route as any)}
            >
              <Ionicons name={item.icon as any} size={32} color="white" />
              <Text style={styles.menuText}>{item.title}</Text>
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
    paddingTop: 60,
    backgroundColor: Colors.light.tint,
  },
  title: {
    fontSize: 28,
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
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 20,
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
  menuText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
});
