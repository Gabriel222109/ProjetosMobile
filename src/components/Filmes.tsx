import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View, } from "react-native";
import { db } from "../../firebaseConfig";

type Props = {
  tela: "cadastrar" | "consultar" | "deletar";
  voltar: () => void;
};

export default function Filmes({ tela, voltar }: Props) {
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");
  const [diretor, setDiretor] = useState("");
  const [filmes, setFilmes] = useState<any[]>([]);
  const [idSelecionado, setIdSelecionado] = useState("");

  async function cadastrar() {
    if (!nome.trim() || !ano.trim() || !idade.trim() || !genero.trim() || !diretor.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    try {
      await addDoc(collection(db, "filmes"), {
        nome: nome.trim(),
        ano: Number(ano),
        idade: idade.trim(),
        genero: genero.trim(),
        diretor: diretor.trim(),
      });
      Alert.alert("Sucesso", "Filme cadastrado!");
      setNome("");
      setAno("");
      setIdade("");
      setGenero("");
      setDiretor("");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  }

  async function consultar() {
    try {
      const querySnapshot = await getDocs(collection(db, "filmes"));
      const lista = querySnapshot.docs.map((doc) => {
        const dados = doc.data();
        return {
          id: doc.id,
          nome: dados.nome || "Sem nome",
          ano: dados.ano || "-",
          idade: dados.idade || "-",
          genero: dados.genero || "-",
          diretor: dados.diretor || "-",
        };
      });
      setFilmes(lista);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os filmes.");
    }
  }

  async function deletar() {
    if (!idSelecionado.trim()) {
      Alert.alert("Atenção", "Informe o ID do filme");
      return;
    }

    try {
      await deleteDoc(doc(db, "filmes", idSelecionado.trim()));
      Alert.alert("Sucesso", "Filme removido!");
      setIdSelecionado("");
    } catch (e) {
      Alert.alert("Erro", String(e));
    }
  }

  useEffect(() => {
    if (tela === "consultar") {
      consultar();
    }
  }, [tela]);

  if (tela === "cadastrar") {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={voltar}>
          <Text style={styles.texto}>← Voltar</Text>
        </Pressable>

        <TextInput style={styles.input} placeholder="Nome do filme" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Ano de lançamento" keyboardType="numeric" value={ano} onChangeText={setAno} />
        <TextInput style={styles.input} placeholder="Idade indicativa" value={idade} onChangeText={setIdade} />
        <TextInput style={styles.input} placeholder="Gênero" value={genero} onChangeText={setGenero} />
        <TextInput style={styles.input} placeholder="Diretor" value={diretor} onChangeText={setDiretor} />

        <Pressable onPress={cadastrar}>
          <Text style={styles.texto}>Cadastrar</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (tela === "consultar") {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={voltar}>
          <Text style={styles.texto}>← Voltar</Text>
        </Pressable>

        {filmes.length === 0 ? (
          <Text style={styles.texto}>Nenhum filme cadastrado.</Text>
        ) : (
          filmes.map((filme) => (
            <View key={filme.id} style={styles.item}>
              <Text style={styles.texto}>{filme.nome}</Text>
              <Text>ID: {filme.id}</Text>
              <Text>Ano: {filme.ano}</Text>
              <Text>Idade: {filme.idade}</Text>
              <Text>Gênero: {filme.genero}</Text>
              <Text>Diretor: {filme.diretor}</Text>
            </View>
          ))
        )}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={voltar}>
        <Text style={styles.texto}>← Voltar</Text>
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="ID do filme"
        value={idSelecionado}
        onChangeText={setIdSelecionado}
      />

      <Pressable onPress={deletar}>
        <Text style={styles.texto}>Deletar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 16,
  },
  item: {
    width: "80%",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },
});