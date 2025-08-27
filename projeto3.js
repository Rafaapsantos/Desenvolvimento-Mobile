import { SafeAreaView, Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { useState } from 'react'

export default function App() {
  const [tarefa, setTarefa] = useState("")
  const [tarefas, setTarefas] = useState([])

  const adicionarTarefa = () => {
    if (tarefa.trim().length === 0) return
    const nova = {
      id: Date.now().toString(),
      titulo: tarefa
    }
    setTarefas([...tarefas, nova])
    setTarefa("")
  }

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(item => item.id != id))
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.textoItem}>{item.titulo}</Text>
      <TouchableOpacity 
        onPress={() => removerTarefa(item.id)} 
        style={styles.botaoRemover}
      >
        <Text style={styles.textoBotaoRemover}>X</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>📋 Lista de Tarefas</Text>

      <View style={styles.areaInput}>
        <TextInput 
          style={styles.input} 
          placeholder="Digite uma tarefa" 
          value={tarefa}
          onChangeText={setTarefa}
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarTarefa}>
          <Text style={styles.textoBotaoAdd}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa adicionada ainda</Text>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    backgroundColor: "#F3F4F6"
  },
  titulo: {
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#1F2937"
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
    backgroundColor: "#fff",
    borderRadius: 8, 
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginLeft: 5
  },
  botaoAdd: {
    marginLeft: 10,
    backgroundColor: "#2563EB",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginRight:8
  },
  textoBotaoAdd: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  textoItem: {
    fontSize: 16,
    color: "#111827"
  },
  botaoRemover: {
    backgroundColor: "#DC2626",
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
    color: "#6B7280",
    fontStyle: "italic"
  }
})
