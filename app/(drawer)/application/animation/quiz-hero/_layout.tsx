import { Stack } from "expo-router";

export default function QuizHeroLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Quiz Hero",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
