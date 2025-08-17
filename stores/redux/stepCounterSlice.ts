import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 타입 정의
export interface StepData {
  date: string;
  steps: number;
  goal: number;
  distance: number;
  calories: number;
  timestamp: number;
}

export interface StepCounterState {
  currentSteps: number;
  dailyGoal: number;
  isTracking: boolean;
  stepHistory: StepData[];
  todayData: StepData | null;
  loading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: StepCounterState = {
  currentSteps: 0,
  dailyGoal: 10000,
  isTracking: false,
  stepHistory: [],
  todayData: null,
  loading: false,
  error: null,
};

// AsyncStorage 키
const STORAGE_KEYS = {
  STEP_HISTORY: "step_counter_history",
  DAILY_GOAL: "step_counter_daily_goal",
  CURRENT_STEPS: "step_counter_current_steps",
};

// AsyncThunk: 데이터 로드
export const loadStepData = createAsyncThunk(
  "stepCounter/loadStepData",
  async () => {
    try {
      const [historyData, goalData, currentStepsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.STEP_HISTORY),
        AsyncStorage.getItem(STORAGE_KEYS.DAILY_GOAL),
        AsyncStorage.getItem(STORAGE_KEYS.CURRENT_STEPS),
      ]);

      const stepHistory = historyData ? JSON.parse(historyData) : [];
      const dailyGoal = goalData ? parseInt(goalData) : 10000;
      const currentSteps = currentStepsData ? parseInt(currentStepsData) : 0;

      return { stepHistory, dailyGoal, currentSteps };
    } catch (error) {
      throw new Error("데이터 로드에 실패했습니다.");
    }
  }
);

// AsyncThunk: 데이터 저장
export const saveStepData = createAsyncThunk(
  "stepCounter/saveStepData",
  async (data: {
    stepHistory: StepData[];
    dailyGoal: number;
    currentSteps: number;
  }) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(
          STORAGE_KEYS.STEP_HISTORY,
          JSON.stringify(data.stepHistory)
        ),
        AsyncStorage.setItem(
          STORAGE_KEYS.DAILY_GOAL,
          data.dailyGoal.toString()
        ),
        AsyncStorage.setItem(
          STORAGE_KEYS.CURRENT_STEPS,
          data.currentSteps.toString()
        ),
      ]);
      return data;
    } catch (error) {
      throw new Error("데이터 저장에 실패했습니다.");
    }
  }
);

// AsyncThunk: 오늘 데이터 업데이트
export const updateTodayData = createAsyncThunk(
  "stepCounter/updateTodayData",
  async (steps: number, { getState }) => {
    try {
      const state = getState() as { stepCounter: StepCounterState };
      const { dailyGoal, stepHistory } = state.stepCounter;

      const today = new Date().toISOString().split("T")[0];
      const currentTime = Date.now();

      // 거리와 칼로리 계산
      const distance = (steps * 0.7) / 1000; // km
      const calories = Math.round(steps * 0.04);

      const todayData: StepData = {
        date: today,
        steps,
        goal: dailyGoal,
        distance,
        calories,
        timestamp: currentTime,
      };

      // 기존 오늘 데이터 찾기
      const existingIndex = stepHistory.findIndex(
        (item) => item.date === today
      );
      let newHistory = [...stepHistory];

      if (existingIndex >= 0) {
        newHistory[existingIndex] = todayData;
      } else {
        newHistory.push(todayData);
      }

      // AsyncStorage에 저장
      await AsyncStorage.setItem(
        STORAGE_KEYS.STEP_HISTORY,
        JSON.stringify(newHistory)
      );
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_STEPS, steps.toString());

      return { todayData, stepHistory: newHistory };
    } catch (error) {
      throw new Error("데이터 업데이트에 실패했습니다.");
    }
  }
);

// 슬라이스 생성
const stepCounterSlice = createSlice({
  name: "stepCounter",
  initialState,
  reducers: {
    // 걸음 수 증가
    incrementSteps: (state, action: PayloadAction<number>) => {
      state.currentSteps += action.payload;
    },

    // 걸음 수 설정
    setCurrentSteps: (state, action: PayloadAction<number>) => {
      state.currentSteps = action.payload;
    },

    // 걸음 수 초기화
    resetSteps: (state) => {
      state.currentSteps = 0;
    },

    // 일일 목표 설정
    setDailyGoal: (state, action: PayloadAction<number>) => {
      state.dailyGoal = action.payload;
    },

    // 추적 상태 변경
    setTrackingStatus: (state, action: PayloadAction<boolean>) => {
      state.isTracking = action.payload;
    },

    // 오늘 데이터 설정
    setTodayData: (state, action: PayloadAction<StepData>) => {
      state.todayData = action.payload;
    },

    // 에러 설정
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // 로딩 상태 설정
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // loadStepData
      .addCase(loadStepData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadStepData.fulfilled, (state, action) => {
        state.loading = false;
        state.stepHistory = action.payload.stepHistory;
        state.dailyGoal = action.payload.dailyGoal;
        state.currentSteps = action.payload.currentSteps;

        // 오늘 데이터 찾기
        const today = new Date().toISOString().split("T")[0];
        state.todayData =
          action.payload.stepHistory.find(
            (item: StepData) => item.date === today
          ) || null;
      })
      .addCase(loadStepData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "데이터 로드에 실패했습니다.";
      })

      // saveStepData
      .addCase(saveStepData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveStepData.fulfilled, (state, action) => {
        state.loading = false;
        state.stepHistory = action.payload.stepHistory;
        state.dailyGoal = action.payload.dailyGoal;
        state.currentSteps = action.payload.currentSteps;
      })
      .addCase(saveStepData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "데이터 저장에 실패했습니다.";
      })

      // updateTodayData
      .addCase(updateTodayData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodayData.fulfilled, (state, action) => {
        state.loading = false;
        state.todayData = action.payload.todayData;
        state.stepHistory = action.payload.stepHistory;
        state.currentSteps = action.payload.todayData.steps;
      })
      .addCase(updateTodayData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "데이터 업데이트에 실패했습니다.";
      });
  },
});

// 액션 내보내기
export const {
  incrementSteps,
  setCurrentSteps,
  resetSteps,
  setDailyGoal,
  setTrackingStatus,
  setTodayData,
  setError,
  setLoading,
} = stepCounterSlice.actions;

// 셀렉터들
export const selectCurrentSteps = (state: { stepCounter: StepCounterState }) =>
  state.stepCounter.currentSteps;

export const selectDailyGoal = (state: { stepCounter: StepCounterState }) =>
  state.stepCounter.dailyGoal;

export const selectIsTracking = (state: { stepCounter: StepCounterState }) =>
  state.stepCounter.isTracking;

export const selectStepHistory = (state: { stepCounter: StepCounterState }) =>
  state.stepCounter.stepHistory;

export const selectTodayData = (state: { stepCounter: StepCounterState }) =>
  state.stepCounter.todayData;

export const selectLoading = (state: { stepCounter: StepCounterState }) =>
  state.stepCounter.loading;

export const selectError = (state: { stepCounter: StepCounterState }) =>
  state.stepCounter.error;

export const selectProgressPercentage = (state: {
  stepCounter: StepCounterState;
}) => {
  const { currentSteps, dailyGoal } = state.stepCounter;
  return Math.min((currentSteps / dailyGoal) * 100, 100);
};

export const selectRemainingSteps = (state: {
  stepCounter: StepCounterState;
}) => {
  const { currentSteps, dailyGoal } = state.stepCounter;
  return Math.max(0, dailyGoal - currentSteps);
};

// 리듀서 내보내기
export default stepCounterSlice.reducer;
