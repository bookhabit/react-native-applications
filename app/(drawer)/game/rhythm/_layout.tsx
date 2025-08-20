import { Stack } from "expo-router";

export default function RhythmLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "리듬 게임",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
