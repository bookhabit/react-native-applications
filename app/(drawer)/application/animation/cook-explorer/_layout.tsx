import { Stack } from "expo-router";

export default function CookExplorerLayout() {
  return (
    <Stack>
              <Stack.Screen
          name="index"
          options={{
            title: "Cook Explorer",
            headerShown: false,
          }}
        />
    </Stack>
  );
}
