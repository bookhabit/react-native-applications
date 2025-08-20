import { Stack } from "expo-router";

export default function SecureNotesLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Secure Notes",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
