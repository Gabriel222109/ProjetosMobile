import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function Jogo() {
  const { nickname } = useLocalSearchParams<{ nickname: string }>();
  const router = useRouter();

  const [numeroSorteado] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [chute, setChute] = useState("");
  const [tentativas, setTentativas] = useState(0);
  const [dica, setDica] = useState("");
  const [corDica, setCorDica] = useState("#333");
  const [acabou, setAcabou] = useState(false);

  async function salvarResultado() {
    try {
      await addDoc(collection(db, "ranking"), {
        nickname: nickname || "Anônimo",
        tentativas,
        data: serverTimestamp(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  function verificar() {
    const valor = parseInt(chute, 10);
    if (isNaN(valor) || valor < 1 || valor > 100) {
      Alert.alert("Atenção", "Digite um número entre 1 e 100.");
      return;
    }

    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);
    setChute("");

    if (valor === numeroSorteado) {
      setDica(`Acertou! O número era ${numeroSorteado}.`);
      setCorDica("#2e7d32");
      setAcabou(true);
      Alert.alert(
        "Parabéns!",
        `${nickname}, você acertou em ${novasTentativas} tentativa(s)!`,
        [{ text: "OK", onPress: () => { salvarResultado(); router.replace("/ranking"); } }]
      );
    } else if (numeroSorteado > valor) {
      setDica("O número é MAIOR");
      setCorDica("green");
    } else {
      setDica("O número é MENOR");
      setCorDica("red");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogador: {nickname}</Text>
      <Text style={styles.info}>Tentativas: {tentativas}</Text>

      {!acabou && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Seu palpite (1-100)"
            keyboardType="number-pad"
            value={chute}
            onChangeText={setChute}
            maxLength={3}
          />
          <Pressable style={styles.botao} onPress={verificar}>
            <Text style={styles.textoBotao}>Chutar</Text>
          </Pressable>
        </>
      )}

      {dica !== "" && (
        <Text style={[styles.dica, { color: corDica }]}>{dica}</Text>
      )}

      <Pressable style={styles.voltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>← Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 18, marginBottom: 20 },
  input: { width: "70%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 20, textAlign: "center", marginBottom: 16 },
  botao: { backgroundColor: "#208AEF", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8 },
  textoBotao: { color: "white", fontSize: 18, fontWeight: "bold" },
  dica: { fontSize: 22, fontWeight: "bold", marginTop: 30 },
  voltar: { marginTop: 40 },
  textoVoltar: { color: "#208AEF", fontSize: 16 },
});