import { Stack } from "expo-router";

export default function ActionSheetLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "액션시트 테스트",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
