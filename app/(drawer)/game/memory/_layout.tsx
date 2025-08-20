import { Stack } from "expo-router";

export default function MemoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "메모리 게임",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
