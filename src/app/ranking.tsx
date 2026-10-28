import { useRouter } from "expo-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseConfig";

type Resultado = {
  id: string;
  nickname: string;
  tentativas: number;
};

export default function Ranking() {
  const [lista, setLista] = useState<Resultado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function carregar() {
      try {
        const q = query(
          collection(db, "ranking"),
          orderBy("tentativas", "asc"),
          limit(20)
        );
        const snap = await getDocs(q);
        const dados = snap.docs.map((d) => ({
          id: d.id,
          nickname: d.data().nickname || "Anônimo",
          tentativas: d.data().tentativas || 0,
        }));
        setLista(dados);
      } catch (e) {
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ranking</Text>

      {carregando ? (
        <ActivityIndicator size="large" />
      ) : lista.length === 0 ? (
        <Text>Nenhum resultado ainda.</Text>
      ) : (
        <ScrollView style={{ width: "100%" }}>
          {lista.map((item, index) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.posicao}>{index + 1}º</Text>
              <Text style={styles.nome}>{item.nickname}</Text>
              <Text style={styles.tentativas}>{item.tentativas} tent.</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <Pressable style={styles.voltar} onPress={() => router.back()}>
        <Text style={styles.textoVoltar}>← Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: "center" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: { flexDirection: "row", justifyContent: "space-between", width: "90%", padding: 12, borderBottomWidth: 1, borderColor: "#eee" },
  posicao: { fontWeight: "bold", width: 40 },
  nome: { flex: 1, fontSize: 16 },
  tentativas: { fontWeight: "bold" },
  voltar: { marginTop: 20 },
  textoVoltar: { color: "#208AEF", fontSize: 16 },
});