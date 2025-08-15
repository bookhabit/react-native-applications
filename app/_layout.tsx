import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "앱 갤러리",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="todo"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="weather"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notes"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chat"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movies"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="calendar"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="gallery"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="shop"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="quiz"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="step-counter"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
