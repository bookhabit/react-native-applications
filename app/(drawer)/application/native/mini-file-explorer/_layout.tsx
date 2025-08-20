import { Stack } from "expo-router";

export default function MiniFileExplorerLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Mini File Explorer",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
