import { Stack } from "expo-router";

export default function SnakeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "스네이크",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
