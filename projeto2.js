import React, { useState,} from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

export default function App(){
  const [nome, setNome] = useState("")
  const [msg, setMsg] = useState("")

  const saudar = () => {
    setMsg(`Bem-vindo(a), ${nome}🤚`)
  }

   const limpar = () => {
     setNome("")
     setMsg("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.titulo}> Boas-vindas </Text>
      <Text style = {styles.subtitulo}> Digite seu nome e toque em "saudar" </Text>
      <View style={styles.card}>
        <Text> Seu nome </Text>
        <TextInput 
        value={nome}
        placeholder = "Ex: Maria"
        onChangeText = {setNome}
        style = {styles.input}
        />
        <TouchableOpacity 
        onPress={saudar}
        style={styles.botao}
        >
        <Text> Saudar </Text>
        </TouchableOpacity>

         <TouchableOpacity
        onPress={limpar}
        style={styles.botao}
        >
        <Text> Limpar </Text>
        </TouchableOpacity>

        <View>
        {msg || "A saudação aparecerá aqui"}
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F5F4F6",
  },
  titulo: {
    fontSize: 26,
    textAlign: "center"
  },
  subtitulo: {
    fontSize: 14,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#D4538FFF",
    borderRadius: 12,
    padding:16,
    margin: 10,
  },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor : "#FFF",
    padding: 10,
    margin:5
  },
  botao: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius:10,
    backgroundColor: "#FFF",
    margin:10
  },

})