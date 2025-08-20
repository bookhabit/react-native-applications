import { Stack } from "expo-router";

export default function PuzzleLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "퍼즐",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
