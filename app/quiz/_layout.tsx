import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "퀴즈 앱",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
