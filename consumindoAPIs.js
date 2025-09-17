import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container, styles.homeBg]}>
      <Text style={styles.titulo}>Bem-vindo</Text>
      <Text style={styles.message}>
        Use o menu lateral para navegar entre as telas de Pokémons, Universidades e
        Livros de Fantasia.
      </Text>
    </SafeAreaView>
  );
}

function PokemonsScreen() {
  const [carregando, setCarregando] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((res) => res.json())
      .then(async (json) => {
        const details = await Promise.all(
          json.results.map(async (p) => {
            const r = await fetch(p.url);
            const d = await r.json();
            return {
              id: d.id,
              name: d.name,
              image: d.sprites?.front_default,
              type: d.types[0]?.type.name || "unknown",
            };
          })
        );
        setPokemons(details);
      })
      .catch((err) => {
        console.error("Erro ao buscar pokémons", err);
      })
      .finally(() => setCarregando(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {item.image && <Image source={{ uri: item.image }} style={styles.avatar} />}
      <View>
        <Text>{(item.name)}</Text>
        <Text>Tipo: {(item.type)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, styles.pokemonBg]}>
      <Text style={styles.titulo}>Lista de Pokémons</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Nenhum Pokémon encontrado</Text>}
        />
      )}
    </SafeAreaView>
  );
}

function UniversitiesScreen() {
  const [carregando, setCarregando] = useState(true);
  const [universidades, setUniversidades] = useState([]);

  useEffect(() => {
    fetch("http://universities.hipolabs.com/search?country=Brazil")
      .then((res) => res.json())
      .then((json) => setUniversidades(json))
      .catch((err) => console.error("Erro ao buscar universidades", err))
      .finally(() => setCarregando(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text>{item.name}</Text>
        <Text>País: {item.country}</Text>
        {item.web_pages && item.web_pages[0] && (
          <TouchableOpacity onPress={() => Linking.openURL(item.web_pages[0])}>
            <Text style={styles.link}>{item.web_pages[0]}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, styles.universityBg]}>
      <Text style={styles.titulo}>Universidades no Brasil</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : (
        <FlatList
          data={universidades}
          keyExtractor={(item, idx) => `${item.name}-${idx}`}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Nenhuma universidade encontrada</Text>}
        />
      )}
    </SafeAreaView>
  );
}

function FantasyBooksScreen() {
  const [carregando, setCarregando] = useState(true);
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/fantasy.json?limit=10")
      .then((res) => res.json())
      .then((json) => {
        const works = (json.works || []).map((w, idx) => ({
          key: w.key || String(idx),
          title: w.title,
          author: w.authors?.[0]?.name || "Desconhecido",
          year: w.first_publish_year || "—",
        }));
        setLivros(works);
      })
      .catch((err) => console.error("Erro ao buscar livros", err))
      .finally(() => setCarregando(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text>{item.title}</Text>
        <Text>Autor: {item.author}</Text>
        <Text>Ano: {item.year}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, styles.booksBg]}>
      <Text style={styles.titulo}>Livros de Fantasia</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : (
        <FlatList
          data={livros}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          ListEmptyComponent={<Text>Nenhum livro encontrado</Text>}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: "#222" },
          headerTintColor: "#fff",
        }}
      >
        <Drawer.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ title: "Início", drawerIcon: () => <Text>🏠</Text> }}
        />
        <Drawer.Screen
          name="Pokemons"
          component={PokemonsScreen}
          options={{ title: "Pokémons", drawerIcon: () => <Text>🎮</Text> }}
        />
        <Drawer.Screen
          name="Livros"
          component={FantasyBooksScreen}
          options={{ title: "Livros", drawerIcon: () => <Text>📚</Text> }}
        />
        <Drawer.Screen
          name="Universidades"
          component={UniversitiesScreen}
          options={{ title: "Universidades", drawerIcon: () => <Text>🎓</Text> }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#F9FAFB" 
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 12, 
    textAlign: "center" 
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    marginRight: 12 
  },
  message: { 
    textAlign: "center", 
    marginTop: 20, 
    fontSize: 16, 
    color: "#555" 
  },
  link: { 
    color: "#1a73e8", 
    marginTop: 6 
  },
  homeBg: { 
    backgroundColor: "#fefefe" 
  },
  pokemonBg: { 
    backgroundColor: "#f0f7ff" 
  },
  universityBg: { 
    backgroundColor: "#fff8f0" 
  },
  booksBg: { 
    backgroundColor: "#f7fff2" 
  },
});
