import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  function iniciar() {
  const nick = nickname.trim();
  if (!nick) {
    Alert.alert("Atenção", "Informe seu nickname para começar.");
    return;
  }
  // @ts-ignore ou as any para contornar a tipagem do Expo Router
  router.push(`/jogo?nickname=${encodeURIComponent(nick)}` as any);
}

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo de Adivinhação</Text>
      <Text style={styles.subtitulo}>Descubra o número entre 1 e 100</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nickname"
        value={nickname}
        onChangeText={setNickname}
        maxLength={20}
      />

      <Pressable style={styles.botao} onPress={iniciar}>
        <Text style={styles.textoBotao}>Começar partida</Text>
      </Pressable>

      <Pressable style={[styles.botao, styles.botaoSecundario]} onPress={() => router.push("/ranking")}>
        <Text style={styles.textoBotao}>Ver Ranking</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  subtitulo: { fontSize: 16, color: "#555", marginBottom: 30 },
  input: { width: "80%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 18, marginBottom: 20 },
  botao: { backgroundColor: "#208AEF", paddingVertical: 14, paddingHorizontal: 30, borderRadius: 8, marginVertical: 8 },
  botaoSecundario: { backgroundColor: "grey" },
  textoBotao: { color: "white", fontSize: 18, fontWeight: "bold" },
});