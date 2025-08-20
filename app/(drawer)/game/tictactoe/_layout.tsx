import { Stack } from "expo-router";

export default function TicTacToeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "틱택토",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
