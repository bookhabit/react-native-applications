import { Stack } from "expo-router";

export default function CalendarLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "캘린더",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
