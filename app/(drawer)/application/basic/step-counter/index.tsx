import { TextBox } from "@/components/atom/TextBox";
import { Button } from "@/components/form/Button";

import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, View } from "react-native";

import { Colors } from "@/constants/Colors";
import * as Sensors from "expo-sensors";

interface StepData {
  date: string;
  steps: number;
  goal: number;
}

export default function StepCounterScreen() {
  const [isTracking, setIsTracking] = useState(false);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10000);
  const [goalInput, setGoalInput] = useState("10000");
  const [stepHistory, setStepHistory] = useState<StepData[]>([]);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goalAchieved, setGoalAchieved] = useState(false);

  const subscription = useRef<any>(null);
  const lastAcceleration = useRef<number>(0);
  const stepThreshold = 1.2; // 걸음 감지 임계값
  const cooldownTime = 300; // 걸음 감지 후 대기 시간 (ms)
  const lastStepTime = useRef<number>(0);

  useEffect(() => {
    // 앱 시작 시 저장된 데이터 불러오기
    loadStepData();

    return () => {
      if (subscription.current) {
        subscription.current.remove();
      }
    };
  }, []);

  const loadStepData = () => {
    // AsyncStorage나 다른 저장소에서 데이터 불러오기
    // 여기서는 간단한 예시로 하드코딩
    const today = new Date().toISOString().split("T")[0];
    const existingData = stepHistory.find((data) => data.date === today);
    if (existingData) {
      setCurrentSteps(existingData.steps);
    }
  };

  const startTracking = async () => {
    try {
      const { status } = await Sensors.Accelerometer.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("권한 필요", "가속도 센서 접근 권한이 필요합니다.");
        return;
      }

      setIsTracking(true);
      subscription.current = Sensors.Accelerometer.addListener(
        ({ x, y, z }) => {
          const acceleration = Math.sqrt(x * x + y * y + z * z);
          const currentTime = Date.now();

          // 걸음 감지 로직
          if (
            acceleration > stepThreshold &&
            acceleration > lastAcceleration.current &&
            currentTime - lastStepTime.current > cooldownTime
          ) {
            const newSteps = currentSteps + 1;
            setCurrentSteps((prev) => prev + 1);

            // 목표 달성 체크
            if (newSteps >= dailyGoal && !goalAchieved) {
              setGoalAchieved(true);
              // 목표 달성 알림
              Alert.alert(
                "🎉 목표 달성!",
                `축하합니다! 오늘 ${newSteps.toLocaleString()}걸음 목표를 달성했습니다!`
              );
            }

            lastStepTime.current = currentTime;
          }

          lastAcceleration.current = acceleration;
        }
      );

      Sensors.Accelerometer.setUpdateInterval(100); // 100ms마다 업데이트
    } catch (error) {
      Alert.alert("오류", "센서를 시작할 수 없습니다.");
    }
  };

  const stopTracking = () => {
    if (subscription.current) {
      subscription.current.remove();
      subscription.current = null;
    }
    setIsTracking(false);
  };

  const resetSteps = () => {
    Alert.alert(
      "걸음 수 초기화",
      "오늘의 걸음 수를 0으로 초기화하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "초기화",
          style: "destructive",
          onPress: () => {
            setCurrentSteps(0);
            setGoalAchieved(false);
          },
        },
      ]
    );
  };

  const saveDailyGoal = () => {
    const goal = parseInt(goalInput);
    if (isNaN(goal) || goal <= 0) {
      Alert.alert("오류", "올바른 목표를 입력해주세요.");
      return;
    }

    setDailyGoal(goal);
    setGoalAchieved(currentSteps >= goal);
    setShowGoalInput(false);
    setGoalInput(goal.toString());
  };

  const getProgressPercentage = () => {
    return Math.min((currentSteps / dailyGoal) * 100, 100);
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return Colors.success;
    if (percentage >= 70) return Colors.warning;
    return Colors.primary;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <TextBox type="title1" style={styles.title}>
            만보기
          </TextBox>

          {/* 걸음 수 표시 */}
          <View style={styles.stepDisplay}>
            <TextBox
              type="title2"
              style={[styles.stepCount, { color: Colors.primary }]}
            >
              {formatNumber(currentSteps)}
            </TextBox>
            <TextBox type="body2" style={styles.stepLabel}>
              걸음
            </TextBox>
            {goalAchieved && (
              <View style={styles.achievementBadge}>
                <TextBox type="body2" style={styles.achievementText}>
                  🎉 목표 달성!
                </TextBox>
              </View>
            )}
          </View>

          {/* 진행률 바 */}
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { backgroundColor: Colors.border }]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${getProgressPercentage()}%`,
                    backgroundColor: getProgressColor(),
                  },
                ]}
              />
            </View>
            <TextBox type="body3" style={styles.progressText}>
              {formatNumber(currentSteps)} / {formatNumber(dailyGoal)} 걸음
              {getProgressPercentage() >= 100 && " 🎉"}
            </TextBox>
          </View>

          {/* 목표 설정 */}
          <View
            style={[
              styles.goalSection,
              {
                backgroundColor: Colors.background,
                borderColor: Colors.border,
              },
            ]}
          >
            <View style={styles.goalHeader}>
              <TextBox type="body1" style={styles.goalTitle}>
                일일 목표
              </TextBox>
              <Button
                title="수정"
                onPress={() => setShowGoalInput(!showGoalInput)}
                style={[
                  styles.editButton,
                  { backgroundColor: Colors.secondary },
                ]}
              />
            </View>

            {showGoalInput ? (
              <View style={styles.goalInputContainer}>
                <TextInput
                  value={goalInput}
                  onChangeText={setGoalInput}
                  placeholder="목표 걸음 수 입력"
                  keyboardType="numeric"
                  style={styles.goalInput}
                />
                <View style={styles.goalInputButtons}>
                  <Button
                    title="저장"
                    onPress={saveDailyGoal}
                    style={[
                      styles.saveButton,
                      { backgroundColor: Colors.success },
                    ]}
                  />
                  <Button
                    title="취소"
                    onPress={() => {
                      setShowGoalInput(false);
                      setGoalInput(dailyGoal.toString());
                    }}
                    style={[
                      styles.cancelButton,
                      { backgroundColor: Colors.error },
                    ]}
                  />
                </View>
              </View>
            ) : (
              <TextBox
                type="body2"
                style={[styles.goalText, { color: Colors.primary }]}
              >
                {formatNumber(dailyGoal)} 걸음
              </TextBox>
            )}
          </View>

          {/* 추적 제어 */}
          <View style={styles.controlSection}>
            <Button
              title={isTracking ? "추적 중지" : "추적 시작"}
              onPress={isTracking ? stopTracking : startTracking}
              style={[
                styles.trackButton,
                { backgroundColor: isTracking ? Colors.error : Colors.primary },
              ]}
            />

            <Button
              title="걸음 수 초기화"
              onPress={resetSteps}
              style={[
                styles.resetButton,
                { backgroundColor: Colors.secondary },
              ]}
            />
          </View>

          {/* 통계 정보 */}
          <View style={styles.statsSection}>
            <TextBox type="body1" style={styles.statsTitle}>
              오늘의 통계
            </TextBox>
            <View style={styles.statsGrid}>
              <View
                style={[
                  styles.statItem,
                  {
                    backgroundColor: Colors.background,
                    borderColor: Colors.border,
                  },
                ]}
              >
                <TextBox
                  type="body2"
                  style={[styles.statLabel, { color: Colors.textSecondary }]}
                >
                  남은 목표
                </TextBox>
                <TextBox
                  type="title3"
                  style={[styles.statValue, { color: Colors.primary }]}
                >
                  {formatNumber(Math.max(0, dailyGoal - currentSteps))}
                </TextBox>
              </View>

              <View
                style={[
                  styles.statItem,
                  {
                    backgroundColor: Colors.background,
                    borderColor: Colors.border,
                  },
                ]}
              >
                <TextBox
                  type="body2"
                  style={[styles.statLabel, { color: Colors.textSecondary }]}
                >
                  달성률
                </TextBox>
                <TextBox
                  type="title3"
                  style={[styles.statValue, { color: Colors.primary }]}
                >
                  {getProgressPercentage().toFixed(1)}%
                </TextBox>
              </View>

              <View
                style={[
                  styles.statItem,
                  {
                    backgroundColor: Colors.background,
                    borderColor: Colors.border,
                  },
                ]}
              >
                <TextBox
                  type="body2"
                  style={[styles.statLabel, { color: Colors.textSecondary }]}
                >
                  예상 거리
                </TextBox>
                <TextBox
                  type="title3"
                  style={[styles.statValue, { color: Colors.primary }]}
                >
                  {((currentSteps * 0.7) / 1000).toFixed(1)}km
                </TextBox>
              </View>

              <View
                style={[
                  styles.statItem,
                  {
                    backgroundColor: Colors.background,
                    borderColor: Colors.border,
                  },
                ]}
              >
                <TextBox
                  type="body2"
                  style={[styles.statLabel, { color: Colors.textSecondary }]}
                >
                  소모 칼로리
                </TextBox>
                <TextBox
                  type="title3"
                  style={[styles.statValue, { color: Colors.primary }]}
                >
                  {Math.round(currentSteps * 0.04)}kcal
                </TextBox>
              </View>
            </View>
          </View>

          {/* 사용법 안내 */}
          <View
            style={[
              styles.helpSection,
              {
                backgroundColor: Colors.background,
                borderColor: Colors.border,
              },
            ]}
          >
            <TextBox type="body2" style={styles.helpTitle}>
              사용법
            </TextBox>
            <TextBox
              type="body3"
              style={[styles.helpText, { color: Colors.textSecondary }]}
            >
              • "추적 시작" 버튼을 눌러 걸음 수 측정을 시작하세요
              {"\n"}• 가속도 센서를 통해 걸음을 자동으로 감지합니다
              {"\n"}• 일일 목표를 설정하고 건강한 생활을 만들어보세요
              {"\n"}• 앱을 종료해도 걸음 수는 계속 측정됩니다
              {"\n"}• 목표 달성 시 축하 알림을 받을 수 있습니다
            </TextBox>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 30,
    textAlign: "center",
  },
  stepDisplay: {
    alignItems: "center",
    marginBottom: 30,
  },
  stepCount: {
    fontSize: 48,
    fontWeight: "bold",
  },
  stepLabel: {
    fontSize: 18,
    marginTop: 5,
  },
  achievementBadge: {
    backgroundColor: Colors.success,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  achievementText: {
    color: Colors.text,
    fontWeight: "bold",
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    textAlign: "center",
  },
  goalSection: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  goalTitle: {
    fontWeight: "600",
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  goalInputContainer: {
    marginTop: 10,
  },
  goalInput: {
    marginBottom: 10,
  },
  goalInputButtons: {
    flexDirection: "row",
    gap: 10,
  },
  saveButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
  goalText: {
    fontSize: 18,
    fontWeight: "600",
  },
  controlSection: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 30,
  },
  trackButton: {
    flex: 1,
  },
  resetButton: {
    flex: 1,
  },
  statsSection: {
    marginBottom: 30,
  },
  statsTitle: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  statItem: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
  },
  statLabel: {
    marginBottom: 8,
    textAlign: "center",
  },
  statValue: {
    fontWeight: "600",
  },
  helpSection: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  helpTitle: {
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
  },
  helpText: {
    lineHeight: 22,
  },
});
