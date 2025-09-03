import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { fonts } from "@/constants/fonts";
import { useColorScheme } from "@/hooks/useColorScheme";
import { queryClient } from "@/stores/react-query/queryClient";
import { persistor, store } from "@/stores/redux";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    [fonts.Pretendard800]: require("../assets/fonts/Pretendard-ExtraBold.ttf"),
    [fonts.Pretendard700]: require("../assets/fonts/Pretendard-Bold.ttf"),
    [fonts.Pretendard600]: require("../assets/fonts/Pretendard-SemiBold.ttf"),
    [fonts.Pretendard500]: require("../assets/fonts/Pretendard-Medium.ttf"),
    [fonts.Pretendard400]: require("../assets/fonts/Pretendard-Regular.ttf"),
    [fonts.Pretendard300]: require("../assets/fonts/Pretendard-Light.ttf"),
    [fonts.Pretendard200]: require("../assets/fonts/Pretendard-ExtraLight.ttf"),
    [fonts.Pretendard100]: require("../assets/fonts/Pretendard-Thin.ttf"),
    [fonts.BMJUA]: require("../assets/fonts/BMJUA.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
          <Stack>
            <Stack.Screen
              name="(drawer)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
