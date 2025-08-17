import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import stepCounterReducer from "./stepCounterSlice";

const rootReducer = combineReducers({
  stepCounter: stepCounterReducer,
});

const persistConfig = {
  key: "root",
  // persist store의 storage로 AsyncStorage를 이용
  // redux-persist에 내장되어 있는 localstorage 또는 sessionStorage를 import해 사용 할 수도 있습니다.
  // 반드시 storage를 입력해 주어야 합니다.import { responsesSlice } from './stomp/responseSlice';

  storage: AsyncStorage,
  whitelist: ["stepCounter"], // stepCounter 데이터를 persist store에 저장
  blacklist: [], //   persist store에 저장하지 않을 reducer들
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// rootReducer 함수의 반환값 타입을 RootState type alias로 지정
export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export default rootReducer;
