import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "모달 테스트",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
