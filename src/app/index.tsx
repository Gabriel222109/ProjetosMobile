import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Filmes from "../components/Filmes";

export default function Index() {
  const [tela, setTela] = useState<"inicial" | "cadastrar" | "consultar" | "deletar">("inicial");

  if (tela !== "inicial") {
    return <Filmes tela={tela} voltar={() => setTela("inicial")} />;
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setTela("cadastrar")}>
        <Text style={styles.texto}>Cadastrar Filme</Text>
      </Pressable>

      <Pressable onPress={() => setTela("consultar")}>
        <Text style={styles.texto}>Consultar Filmes</Text>
      </Pressable>

      <Pressable onPress={() => setTela("deletar")}>
        <Text style={styles.texto}>Deletar Filme</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  texto: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#208AEF",
  },
});