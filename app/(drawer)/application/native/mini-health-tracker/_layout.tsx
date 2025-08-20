import { Stack } from "expo-router";

export default function MiniHealthTrackerLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Mini Health Tracker",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
