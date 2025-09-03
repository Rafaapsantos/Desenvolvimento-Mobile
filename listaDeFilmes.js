import { SafeAreaView, Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome' 

const STORAGE_KEY = '@lista_filmes'

export default function App() {
  const [nome, setNome] = useState("")
  const [ano, setAno] = useState("")
  const [filmes, setFilmes] = useState([])

  const adicionarFilme = () => {
    if (nome.trim().length === 0 || ano.trim().length === 0) {
      return
    }
    const novo = {
      id: Date.now().toString(),
      titulo: nome,
      ano: ano,
      favorito: false
    }
    setFilmes([...filmes, novo])
    setNome("")
    setAno("")
  }

  const removerFilme = (id) => {
    setFilmes(filmes.filter(item => item.id != id))
  }

const limparTudo = () => {
  setFilmes([])
}

  const alternarFavorito = (id) => {
    setFilmes(filmes.map(x => 
      x.id === id ? { ...x, favorito: !x.favorito } : x
    ))
  }

 const renderItem = ({ item }) => (
  <View style={styles.item}>
    <TouchableOpacity onPress={() => alternarFavorito(item.id)}>
      <Icon 
        name={item.favorito ? "star" : "star-o"} 
        size={22} 
        color={item.favorito ? "#F59E0B" : "#6B7280"} 
      />
    </TouchableOpacity>
    <Text style={styles.textoItem}>
      {item.titulo} ({item.ano})
    </Text>
    <TouchableOpacity 
      onPress={() => removerFilme(item.id)} 
      style={styles.botaoRemover}
    >
      <Text style={styles.textoBotaoRemover}>X</Text>
    </TouchableOpacity>
  </View>
)
  useEffect(() => {
    (async () => {
      try {
        const salvo = await AsyncStorage.getItem(STORAGE_KEY)
        if (salvo) {
          setFilmes(JSON.parse(salvo))
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os filmes")
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filmes))
      } catch (error) {
        Alert.alert("Erro", "Não foi possível salvar os filmes")
      }
    })()
  }, [filmes])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🎬 Lista de Filmes Assistidos</Text>

      <View style={styles.areaInput}>
        <TextInput 
          style={styles.input} 
          placeholder="Nome do filme" 
          value={nome}
          onChangeText={setNome}
        />
        <TextInput 
          style={[styles.input, { width: 100 }]} 
          placeholder="Ano" 
          value={ano}
          onChangeText={setAno}
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarFilme}>
          <Text style={styles.textoBotaoAdd}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum filme cadastrado ainda.</Text>}
      />

      {filmes.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparTudo}>
          <Text style={styles.textoBotaoLimpar}>Limpar Tudo</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#111827", 
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15
  },
  titulo: {
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#F9FAFB" 
  },
  areaInput: {
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 15
  },
  input: {
    flex: 1, 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    backgroundColor: "#1F2937",
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: "#374151",
    color: "#F9FAFB", 
    marginRight: 5,
    marginLeft: 5
  },
  botaoAdd: {
    marginRight: 8,
    marginLeft:10,
    backgroundColor: "#1AEC07FF", 
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textoBotaoAdd: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#1F2937", 
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  textoItem: {
    fontSize: 16,
    color: "#F9FAFB", 
    flex: 1,
    marginHorizontal: 10
  },
  botaoRemover: {
    backgroundColor: "#EF4444", 
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  textoBotaoRemover: {
    color: "#fff",
    fontWeight: "bold"
  },
  vazio: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#9CA3AF", 
    fontStyle: "italic"
  },
  botaoLimpar: {
    marginTop: 10,
    backgroundColor: "#EF4444", 
    padding: 12,
    borderRadius: 8
  },
  textoBotaoLimpar: {
    color: "#111827", 
    textAlign: "center",
    fontWeight: "bold"
  }
})
