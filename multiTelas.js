import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { User, Mail, Phone, Calendar } from "lucide-react-native"; 

const Stack = createStackNavigator();

//tela incial
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Bem-vindo ao App!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Form")}
      >
        <Text style={styles.buttonText}>Ir para Cadastro</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

//tela de formulario
function FormScreen({ navigation, route }) {
  const {
    nome: nomeParam,
    email: emailParam,
    telefone: telefoneParam,
    idade: idadeParam,
  } = route.params ?? {};

  const [nome, setNome] = useState(nomeParam ?? "");
  const [email, setEmail] = useState(emailParam ?? "");
  const [telefone, setTelefone] = useState(telefoneParam ?? "");
  const [idade, setIdade] = useState(idadeParam ?? "");

  const enviar = () => {
    if (!nome.trim() || !email.trim() || !telefone.trim() || !idade.trim())
      return;
    navigation.navigate("Confirm", { nome, email, telefone, idade });
  };

  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Text>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
        />

        <Text>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
        />

        <Text>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Digite seu telefone"
          keyboardType="numeric"
          maxLength={11}
        />

        <Text>Idade</Text>
        <TextInput
          style={styles.input}
          value={idade}
          onChangeText={setIdade}
          placeholder="Digite sua idade"
          keyboardType="numeric"
          maxLength={3}
        />

        <TouchableOpacity style={styles.button} onPress={enviar}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

//tela de confirmação
function ConfirmScreen({ route, navigation }) {
  const { nome, email, telefone, idade } = route.params;

  return (
    <SafeAreaView style={styles.container}>

      <Text>Nome: {nome}</Text>
      <Text>E-mail: {email}</Text>
      <Text>Telefone: {telefone}</Text>
      <Text>Idade: {idade}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Form", { nome, email, telefone, idade })
        }
      >
        <Text style={styles.buttonText}>Editar dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Resumo", { nome, email, telefone, idade })
        }
      >
        <Text style={styles.buttonText}>Ir para Resumo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

//tela de resumo
function ResumoScreen({ route, navigation }) {
  const { nome, email, telefone, idade } = route.params;

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <User color="#2E7D32" size={20} />
          <Text style={styles.cardText}> {nome}</Text>
        </View>
        <View style={styles.cardRow}>
          <Mail color="#2E7D32" size={20} />
          <Text style={styles.cardText}> {email}</Text>
        </View>
        <View style={styles.cardRow}>
          <Phone color="#2E7D32" size={20} />
          <Text style={styles.cardText}> {telefone}</Text>
        </View>
        <View style={styles.cardRow}>
          <Calendar color="#2E7D32" size={20} />
          <Text style={styles.cardText}> {idade} anos</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>Voltar para Início</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Início" }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ title: "Cadastro" }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{ title: "Confirmação" }}
        />
        <Stack.Screen
          name="Resumo"
          component={ResumoScreen}
          options={{ title: "Resumo Final" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    width: 260,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    width: 220,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    width: 300,
    backgroundColor: "#E8F5E9",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  cardText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
});
