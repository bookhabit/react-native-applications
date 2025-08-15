import { Stack } from "expo-router";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "채팅 앱",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
