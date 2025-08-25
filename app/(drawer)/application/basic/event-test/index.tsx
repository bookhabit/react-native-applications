import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TextBox } from '@/components/atom/TextBox';
import { Button } from '@/components/form/Button';
import { Colors } from '@/constants/Colors';

export default function EventTestScreen() {
  const [touchCount, setTouchCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [pinchCount, setPinchCount] = useState(0);

  const handleTouch = () => {
    setTouchCount(prev => prev + 1);
  };

  const handleLongPress = () => {
    setLongPressCount(prev => prev + 1);
    Alert.alert('Long Press', 'Long press detected!');
  };

  const handleSwipe = () => {
    setSwipeCount(prev => prev + 1);
  };

  const handlePinch = () => {
    setPinchCount(prev => prev + 1);
  };

  const resetCounts = () => {
    setTouchCount(0);
    setLongPressCount(0);
    setSwipeCount(0);
    setPinchCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>이벤트 테스트</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>터치 이벤트</Text>
          <TouchableOpacity 
            style={styles.touchArea} 
            onPress={handleTouch}
            onLongPress={handleLongPress}
          >
            <Text style={styles.touchText}>터치하거나 길게 누르세요</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>터치 횟수: {touchCount}</Text>
          <Text style={styles.countText}>길게 누르기 횟수: {longPressCount}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>스와이프 제스처</Text>
          <View style={styles.swipeArea}>
            <Text style={styles.swipeText}>좌우로 스와이프하세요</Text>
          </View>
          <Text style={styles.countText}>스와이프 횟수: {swipeCount}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>핀치 제스처</Text>
          <View style={styles.pinchArea}>
            <Text style={styles.pinchText}>핀치 제스처를 해보세요</Text>
          </View>
          <Text style={styles.countText}>핀치 횟수: {pinchCount}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림 테스트</Text>
          <Button 
            title="알림 표시" 
            onPress={() => Alert.alert('알림', '이것은 테스트 알림입니다!')}
            style={styles.button}
          />
          <Button 
            title="확인 다이얼로그" 
            onPress={() => Alert.alert(
              '확인', 
              '정말로 진행하시겠습니까?',
              [
                { text: '취소', style: 'cancel' },
                { text: '확인', onPress: () => Alert.alert('확인됨', '사용자가 확인했습니다.') }
              ]
            )}
            style={styles.button}
          />
        </View>

        <Button 
          title="카운터 초기화" 
          onPress={resetCounts}
          style={[styles.button, styles.resetButton]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: Colors.dark.tint,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 15,
  },
  touchArea: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  touchText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  swipeArea: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  swipeText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  pinchArea: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  pinchText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '500',
  },
  countText: {
    color: Colors.dark.text,
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: Colors.light.tint,
  },
});
