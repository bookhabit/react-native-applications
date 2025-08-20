import { Stack } from "expo-router";

export default function TripLoggerLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Trip Logger",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
