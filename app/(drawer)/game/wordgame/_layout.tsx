import { Stack } from "expo-router";

export default function WordGameLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "단어 게임",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
