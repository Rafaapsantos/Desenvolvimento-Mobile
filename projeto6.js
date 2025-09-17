import {SafeAreaView, Text, ActivityIndicator, FlatList, Image, View, StyleSheet} from "react-native"
import {useState, useEffect} from "react"
export default function App(){
    const [carregando, setCarregando] = useState(true)
    const [usuarios, setUsuarios] = useState([])
    // será executado automaticamente quando componente for carregado
    useEffect( () => {
        fetch("https://reqres.in/api/users?per_page=10", {
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        }
        )
        .then((res) => res.json())
        .then ((json) => {
                setUsuarios(json.data)
        })
        .catch((err) => {
                console.err("Erro ao buscar usuário ", err)
        })
        .finally(() => setCarregando(false)) 
    }, [])

    const renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <Image source={{uri: item.avatar}} style={styles.avatar}/>
                <View>
                    <Text> {item.first_name} </Text> <Text> {item.email} </Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}> Lista de Usuários </Text>
            {
                carregando ? 
                    ( <ActivityIndicator size="large" color="#2563EB"/> ) : (
                        <FlatList
                            data={usuarios}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            ListEmptyComponent={
                                <Text> Nenhum usuário encontrado </Text> 
                            }>
                        </FlatList>
                    )
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 16, backgroundColor: "#F9FAFB"
    },
    titulo: {
        fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center"
    },
    item: {
        flexDirection: "row", alignItems: "center", padding: 12, marginBottom: 8,
        backgroundColor: "#fff", borderRadius: 8, shadowColor: "#000",
        shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    },   
    avatar: {
        width: 56, height: 56, borderRadius: 28, marginRight: 12
    }
}
)