import { Stack } from "expo-router";

export default function FormLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "폼 예제",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
