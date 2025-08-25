import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Modal } from 'react-native';
import { TextBox } from '@/components/atom/TextBox';
import { Button } from '@/components/form/Button';
import { Colors } from '@/constants/Colors';

export default function DialogPopupNotificationScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const showAlert = () => {
    Alert.alert('알림', '이것은 기본 알림입니다!');
  };

  const showConfirmDialog = () => {
    Alert.alert(
      '확인',
      '정말로 진행하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => Alert.alert('완료', '작업이 완료되었습니다.') }
      ]
    );
  };

  const showInputDialog = () => {
    Alert.prompt(
      '입력',
      '이름을 입력하세요:',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: (text) => Alert.alert('입력됨', `입력된 이름: ${text}`) }
      ]
    );
  };

  const showCustomModal = () => {
    setModalVisible(true);
  };

  const showActionSheet = () => {
    setActionSheetVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>대화상자 & 팝업 & 알림</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기본 알림</Text>
          <Button 
            title="알림 표시" 
            onPress={showAlert}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>확인 다이얼로그</Text>
          <Button 
            title="확인 다이얼로그" 
            onPress={showConfirmDialog}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>입력 다이얼로그</Text>
          <Button 
            title="입력 다이얼로그" 
            onPress={showInputDialog}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>커스텀 모달</Text>
          <Button 
            title="모달 열기" 
            onPress={showCustomModal}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>액션 시트</Text>
          <Button 
            title="액션 시트 열기" 
            onPress={showActionSheet}
            style={styles.button}
          />
        </View>

        {/* 커스텀 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>커스텀 모달</Text>
              <Text style={styles.modalText}>이것은 커스텀 모달입니다.</Text>
              <Button 
                title="닫기" 
                onPress={() => setModalVisible(false)}
                style={styles.button}
              />
            </View>
          </View>
        </Modal>

        {/* 액션 시트 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={actionSheetVisible}
          onRequestClose={() => setActionSheetVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.actionSheetContent}>
              <Text style={styles.actionSheetTitle}>액션 선택</Text>
              <Button 
                title="사진 촬영" 
                onPress={() => {
                  Alert.alert('선택됨', '사진 촬영을 선택했습니다.');
                  setActionSheetVisible(false);
                }}
                style={styles.button}
              />
              <Button 
                title="갤러리에서 선택" 
                onPress={() => {
                  Alert.alert('선택됨', '갤러리에서 선택을 선택했습니다.');
                  setActionSheetVisible(false);
                }}
                style={styles.button}
              />
              <Button 
                title="취소" 
                onPress={() => setActionSheetVisible(false)}
                style={[styles.button, styles.cancelButton]}
              />
            </View>
          </View>
        </Modal>
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
  button: {
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.dark.tint,
    borderRadius: 12,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  actionSheetContent: {
    backgroundColor: Colors.dark.tint,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionSheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: Colors.light.tint,
  },
});
