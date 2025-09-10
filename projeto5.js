import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

function FormScreen({ navigation }) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")

  const enviar = () => {
    const name = nome.trim()
    const email1 = email.trim()

    if (!name || !email1) return

    navigation.navigate("Detalhes", { nome: name, email: email1 })
  }

  return (
    <SafeAreaView>
      <Text>Cadastro Rápido</Text>
      <View>
        <Text>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Informe o nome"
        />

        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Informe o email"
        />

        <TouchableOpacity onPress={enviar}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DetailScreen({ route, navigation }) {
  const { nome, email } = route.params ?? {}

  return (
    <SafeAreaView>
      <Text>Detalhes</Text>
      <View>
        <Text>Nome: {nome}</Text>
        <Text>E-mail: {email}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Form")}>
          <Text>Voltar e Editar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: "Formulário" }}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetailScreen}
          options={{ title: "Confirmação" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
