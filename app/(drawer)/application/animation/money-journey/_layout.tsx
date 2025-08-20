import { Stack } from "expo-router";

export default function MoneyJourneyLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Money Journey",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
