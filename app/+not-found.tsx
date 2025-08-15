import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { TextBox } from "@/components/atom/TextBox";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <TextBox type="title1">This screen does not exist.</TextBox>
        <Link href="/" style={styles.link}>
          <TextBox type="button1">Go to home screen!</TextBox>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
