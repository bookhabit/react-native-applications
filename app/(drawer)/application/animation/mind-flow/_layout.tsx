import { Stack } from "expo-router";

export default function MindFlowLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "MindFlow",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
