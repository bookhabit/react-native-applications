import { Stack } from "expo-router";

export default function MoviesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "영화 검색",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
