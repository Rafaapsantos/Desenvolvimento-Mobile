import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [clicou, setClicou] = useState(false);

  const alternaMensagem = useCallback(() => {
    setClicou((prev) => !prev);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Olá, React Native</Text>

      <Text style={styles.message}>
        {clicou ? "Você clicou no botão!" : "Toque no botão"}
      </Text>

      <View style={styles.areaBotao}>
        <TouchableOpacity
          style={[styles.botao, clicou && styles.botaoReset]}
          onPress={alternaMensagem}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotao}>
            {clicou ? "Resetar" : "Clique aqui"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  titulo: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  areaBotao: {
    width: 200,
  },
  botao: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
  },
  botaoReset: {
    backgroundColor: "#FF3B30",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
