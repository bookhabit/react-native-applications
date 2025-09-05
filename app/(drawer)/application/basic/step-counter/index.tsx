import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TextInput } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { TextBox } from "@/components/atom/TextBox";
import { Button } from "@/components/form/Button";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function StepCounterScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10000);
  const [goalInput, setGoalInput] = useState("10000");
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  
  const subscription = useRef<any>(null);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      // 오늘 00:00부터 현재까지의 걸음수 가져오기
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const now = new Date();

      try {
        const pastStepCountResult = await Pedometer.getStepCountAsync(today, now);
        console.log('오늘 걸음수:', pastStepCountResult);
        if (pastStepCountResult) {
          setPastStepCount(pastStepCountResult.steps);
          setCurrentStepCount(pastStepCountResult.steps);
        }
      } catch (error) {
        console.log('걸음수 조회 오류:', error);
      }

      // 실시간 걸음수 추적 시작
      setIsTracking(true);
      const newSubscription = Pedometer.watchStepCount(result => {
        console.log('실시간 걸음수:', result.steps);
        setCurrentStepCount(result.steps);
        
        // 목표 달성 체크
        if (result.steps >= dailyGoal && !goalAchieved) {
          setGoalAchieved(true);
          Alert.alert(
            "🎉 목표 달성!",
            `축하합니다! 오늘 ${result.steps.toLocaleString()}걸음 목표를 달성했습니다!`
          );
        }
      });
      
      return newSubscription;
    }
    return null;
  };

  const stopTracking = () => {
    if (subscription.current) {
      subscription.current.remove();
      subscription.current = null;
    }
    setIsTracking(false);
  };

  const saveDailyGoal = () => {
    const goal = parseInt(goalInput);
    if (isNaN(goal) || goal <= 0) {
      Alert.alert("오류", "올바른 목표를 입력해주세요.");
      return;
    }

    setDailyGoal(goal);
    setGoalAchieved(currentStepCount >= goal);
    setShowGoalInput(false);
    setGoalInput(goal.toString());
  };

  const getProgressPercentage = () => {
    return Math.min((currentStepCount / dailyGoal) * 100, 100);
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

  useEffect(() => {
    const initSubscription = async () => {
      subscription.current = await subscribe();
    };
    
    initSubscription();
    
    return () => {
      if (subscription.current) {
        subscription.current.remove();
      }
    };
  }, []);

  if (isPedometerAvailable === 'checking') {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <TextBox type="body1">만보기 확인 중...</TextBox>
        </View>
      </ThemedView>
    );
  }

  if (isPedometerAvailable === 'false') {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.errorContainer}>
          <TextBox type="title2" style={styles.errorTitle}>
            만보기 사용 불가
          </TextBox>
          <TextBox type="body2" style={styles.errorText}>
            이 기기에서는 만보기 기능을 사용할 수 없습니다.
          </TextBox>
        </View>
      </ThemedView>
    );
  }

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

          {/* 실시간 걸음 수 표시 */}
          <View style={styles.stepDisplay}>
            <TextBox
              type="title2"
              style={[styles.stepCount, { color: Colors.primary }]}
            >
              {formatNumber(currentStepCount)}
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
              {formatNumber(currentStepCount)} / {formatNumber(dailyGoal)} 걸음
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
                  style={[styles.goalInput, { 
                    backgroundColor: Colors.background,
                    borderColor: Colors.border,
                    color: Colors.text 
                  }]}
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

          {/* 추적 상태 */}
          <View style={styles.statusSection}>
            <View style={styles.statusItem}>
              <TextBox type="body2" style={styles.statusLabel}>
                추적 상태
              </TextBox>
              <TextBox 
                type="body2" 
                style={[
                  styles.statusValue, 
                  { color: isTracking ? Colors.success : Colors.error }
                ]}
              >
                {isTracking ? "실시간 추적 중" : "추적 중지됨"}
              </TextBox>
            </View>
            
            <View style={styles.statusItem}>
              <TextBox type="body2" style={styles.statusLabel}>
                만보기 지원
              </TextBox>
              <TextBox 
                type="body2" 
                style={[
                  styles.statusValue, 
                  { color: Colors.success }
                ]}
              >
                지원됨
              </TextBox>
            </View>
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
                  {formatNumber(Math.max(0, dailyGoal - currentStepCount))}
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
                  {((currentStepCount * 0.7) / 1000).toFixed(1)}km
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
                  {Math.round(currentStepCount * 0.04)}kcal
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
              • 앱을 실행하면 자동으로 실시간 걸음수 추적이 시작됩니다
              {"\n"}• 기기의 만보기 센서를 통해 정확한 걸음수를 측정합니다
              {"\n"}• 일일 목표를 설정하고 건강한 생활을 만들어보세요
              {"\n"}• 목표 달성 시 축하 알림을 받을 수 있습니다
              {"\n"}• 앱을 종료해도 걸음 수는 계속 측정됩니다
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: Colors.textSecondary,
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
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
  statusSection: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statusLabel: {
    color: Colors.textSecondary,
  },
  statusValue: {
    fontWeight: "600",
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
