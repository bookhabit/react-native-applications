import { Stack } from "expo-router";

export default function NotesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "메모장",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
