import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { TextBox } from '@/components/atom/TextBox';
import { Button } from '@/components/form/Button';
import { Colors } from '@/constants/Colors';

export default function ListViewScreen() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const listViewDemos = [
    {
      id: 'adapter-view-demo',
      title: 'AdapterView 데모',
      description: 'ListView와 ArrayAdapter를 사용한 기본 리스트 구현',
      icon: '📱',
    },
    {
      id: 'recycler-view-demo',
      title: 'RecyclerView 데모',
      description: 'RecyclerView와 ViewHolder 패턴을 사용한 고성능 리스트',
      icon: '🔄',
    },
    {
      id: 'spinner-demo',
      title: 'Spinner 데모',
      description: '드롭다운 선택 박스 구현',
      icon: '⬇️',
    },
    {
      id: 'fragment-demo',
      title: 'Fragment 데모',
      description: '모듈화된 UI 단위 Fragment 구현',
      icon: '🧩',
    },
    {
      id: 'view-pager-demo',
      title: 'ViewPager 데모',
      description: '스와이프 가능한 페이지 전환 컨테이너',
      icon: '📄',
    },
    {
      id: 'compose-lazy-demo',
      title: 'Compose Lazy 데모',
      description: 'Jetpack Compose의 LazyColumn/LazyRow 사용법',
      icon: '⚡',
    },
  ];

  const renderDemoItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.demoItem}
      onPress={() => setSelectedDemo(item.id)}
    >
      <Text style={styles.demoIcon}>{item.icon}</Text>
      <View style={styles.demoContent}>
        <Text style={styles.demoTitle}>{item.title}</Text>
        <Text style={styles.demoDescription}>{item.description}</Text>
      </View>
      <Text style={styles.demoArrow}>→</Text>
    </TouchableOpacity>
  );

  const showDemoDetails = (demoId: string) => {
    const demo = listViewDemos.find(d => d.id === demoId);
    if (demo) {
      // 실제로는 해당 데모 스크린으로 이동
      console.log(`Selected demo: ${demo.title}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>리스트 뷰 학습</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>사용 가능한 데모</Text>
          <Text style={styles.sectionDescription}>
            각 데모를 선택하여 리스트 뷰의 다양한 구현 방법을 학습하세요.
          </Text>
        </View>

        <FlatList
          data={listViewDemos}
          renderItem={renderDemoItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={styles.demoList}
        />

        {selectedDemo && (
          <View style={styles.selectedDemo}>
            <Text style={styles.selectedDemoTitle}>선택된 데모</Text>
            <Text style={styles.selectedDemoText}>
              {listViewDemos.find(d => d.id === selectedDemo)?.title}
            </Text>
            <Button
              title="데모 실행"
              onPress={() => showDemoDetails(selectedDemo)}
              style={styles.button}
            />
            <Button
              title="선택 해제"
              onPress={() => setSelectedDemo(null)}
              style={[styles.button, styles.cancelButton]}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>리스트 뷰 종류</Text>
          <Text style={styles.infoText}>
            • AdapterView: 기본적인 리스트 뷰 구현{'\n'}
            • RecyclerView: 고성능 리스트 뷰 (권장){'\n'}
            • Spinner: 드롭다운 선택 박스{'\n'}
            • Fragment: 모듈화된 UI 단위{'\n'}
            • ViewPager: 스와이프 가능한 페이지{'\n'}
            • Compose Lazy: Jetpack Compose의 리스트
          </Text>
        </View>
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
  sectionDescription: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
  },
  demoList: {
    marginBottom: 20,
  },
  demoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.dark.tint,
    borderRadius: 12,
    marginBottom: 15,
  },
  demoIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  demoContent: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 5,
  },
  demoDescription: {
    fontSize: 14,
    color: Colors.dark.text,
    opacity: 0.8,
    lineHeight: 20,
  },
  demoArrow: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  selectedDemo: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  selectedDemoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 10,
  },
  selectedDemoText: {
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 15,
  },
  button: {
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: Colors.light.tint,
  },
  infoText: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 24,
  },
});
