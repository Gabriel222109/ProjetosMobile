import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Adivinhação" }} />
      <Stack.Screen name="jogo" options={{ title: "Jogo" }} />
      <Stack.Screen name="ranking" options={{ title: "Ranking" }} />
    </Stack>
  );
}