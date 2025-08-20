import { Stack } from "expo-router";

export default function UtilityKitLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Utility Kit",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
