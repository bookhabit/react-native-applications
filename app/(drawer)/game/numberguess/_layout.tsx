import { Stack } from "expo-router";

export default function NumberGuessLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "숫자 맞추기",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
