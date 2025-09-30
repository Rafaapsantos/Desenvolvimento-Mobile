import { React, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [classificacao, setClassificacao] = useState("");

  const calcularIMC = () => {
    const imc = (peso / (altura * altura)).toFixed(2);

    let classificacaoIMC = "";
    if (imc < 18.5) classificacaoIMC = "Abaixo do peso";
    else if (imc < 24.9) classificacaoIMC = "Peso normal";
    else if (imc < 29.9) classificacaoIMC = "Sobrepeso";
    else if (imc < 34.9) classificacaoIMC = "Obesidade Grau I";
    else if (imc < 39.9) classificacaoIMC = "Obesidade Grau II";
    else classificacaoIMC = "Obesidade Grau III";

    setResultado(`Seu IMC é: ${imc}`);
    setClassificacao(classificacaoIMC);
  };

  const limparCampos = () => {
    setPeso("");
    setAltura("");
    setResultado(null);
    setClassificacao("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Calculadora de IMC</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          value={altura}
          onChangeText={setAltura}
        />

        <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
          <Text style={styles.textoBotao}>Calcular</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
            <Text style={styles.textoResultado}>{resultado}</Text>
            <Text style={styles.textoResultado}>{classificacao}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#a87352",
    borderRadius: 12,
    padding: 16,
    height: 450,
    width: 400,
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  input: {
    width: 200,
    height: 50,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  botao: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: 200,
    alignItems: "center",
  },
  botaoLimpar: {
    backgroundColor: "#E53935",
    padding:12,
    borderRadius: 10,
    marginTop: 10,
    width: 200,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textoResultado: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
    color: "#fff",
  },
});
