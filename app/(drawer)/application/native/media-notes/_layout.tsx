import { Stack } from "expo-router";

export default function MediaNotesLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Media Notes",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
