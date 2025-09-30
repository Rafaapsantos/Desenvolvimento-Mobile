import {SafeAreaView, Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import {useState} from 'react'

export default function App(){

  const [produto, setProduto] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [lista, setLista] = useState([])

  const adicionarItem = () => {
    if (produto.trim().length === 0 || quantidade.trim().length === 0){
      return // produto inválido
    }
    const novoProduto = { 
      id: Date.now().toString(),
      nomeProduto: produto,
      qntd: quantidade
    } // cria produto novo 

    setLista([...lista, novoProduto]) // Adiciona produto na lista 
    setProduto('');
    setQuantidade('');
  }

  const removerProduto = (id) => {
    setLista(lista.filter( (item) => item.id != id))
  }

  const limparLista = () => {
    setLista([]);
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.item,
      { backgroundColor: item.qntd % 2 === 0 ? '#47e6bc' : '#e2f048' }
    ]}>
      <View>
        <Text>Produto = {item.nomeProduto}</Text>
        <Text>Quantidade = {item.qntd}</Text>
      </View>
      <TouchableOpacity onPress={() => removerProduto(item.id)} style={styles.botaoRemover}>
        <Text style={styles.textoBotaoLimpar}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}> 🛒 Lista de Compras </Text>

      <View style={styles.areaInput}>
        <TextInput 
          style={styles.input} 
          placeholder="Produto"
          value={produto}
          onChangeText={setProduto}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
        />

        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarItem}>
          <Text style={styles.textoBotaoAdd}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum item adicionado ainda</Text>}
      />

      {lista.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparLista}>
          <Text style={styles.textoBotaoLimpar}>Limpar Lista</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  areaInput: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft:20,
    marginRight:20,
  },
  botaoAdd: {
    backgroundColor: '#72cb26',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
    marginLeft:20,
    marginRight:20,
  },
  item: {
    padding: 12,
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoRemover: {
    backgroundColor: '#e62525',
    padding: 6,
    borderRadius: 5,
  },
  botaoLimpar: {
    backgroundColor: '#e62525',
    padding: 12,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotaoLimpar:{
    color: 'white', 
    fontWeight: 'bold'
  },
  textoBotaoAdd:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  vazio: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#a39999',
  },
});
