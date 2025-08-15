import { Stack } from "expo-router";

export default function StepCounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "만보기",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
