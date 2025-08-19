import "react-native-gesture-handler/jestSetup";

// React와 JSX 지원을 위한 설정
import React from "react";
global.React = React;

// 환경 변수 모킹
process.env.EXPO_PUBLIC_MOVIE_API_KEY = "test-api-key";
process.env.EXPO_PUBLIC_MOVIE_API_URL = "https://api.themoviedb.org/3";

// Mock expo-image
jest.mock("expo-image", () => ({
  Image: "Image",
}));

// Mock expo-vector-icons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock expo-font
jest.mock("expo-font", () => ({
  useFonts: () => [true],
}));

// Mock expo-constants
jest.mock("expo-constants", () => ({
  expoConfig: {
    extra: {
      TMDB_API_KEY: "test-api-key",
    },
  },
}));

// Mock axios
jest.mock("@/api/config", () => ({
  AXIOS: {
    get: jest.fn(),
  },
}));

// Global test utilities
global.fetch = jest.fn();

// Suppress console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// JSX 지원을 위한 설정
global.jsx = React.createElement;
global.jsxs = React.createElement;
