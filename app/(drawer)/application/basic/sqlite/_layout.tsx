import { Stack } from "expo-router";

export default function SqliteLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "SQLite 데이터베이스",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
