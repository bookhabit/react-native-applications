import { Stack } from "expo-router";

export default function WeatherLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "날씨 정보",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
