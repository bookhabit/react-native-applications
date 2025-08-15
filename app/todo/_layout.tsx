import { Stack } from "expo-router";

export default function TodoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "To-Do 리스트",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
