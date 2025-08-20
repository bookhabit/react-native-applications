import { Stack } from "expo-router";

export default function SensorPlaygroundLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Sensor Playground",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
