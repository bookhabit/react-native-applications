import { Stack } from "expo-router";

export default function GalleryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "이미지 갤러리",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
