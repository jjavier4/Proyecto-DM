import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";


export default function Pedidos(){

    const [ loader, setLoader ] = useState(true)

    const [ orders, setOrders ] = useState([])

    const navigation = useNavigation();

    useEffect(()=> {

        const unsubscribeFocus = navigation.addListener('focus', () => {
            console.log('Pantalla enfocada');
            setLoader(true)
        });

        const unsubscribeBlur = navigation.addListener('blur', () => {
            console.log('Pantalla desenfocada');
            setLoader(false)
        });
    }, [navigation])


    useEffect(()=>{

        if( !loader ) { return }

        getDocs(collection(db, "orders"))
        .then((docSnap) => {
            
            setOrders(
                docSnap.docs.map((doc) => ({
                    id: doc.id,  // ID del documento
                    ...doc.data(), // Los datos del documento
                }))
            )
            setLoader(false)
        })
        .catch((error) => {
            console.error("Error al obtener el usuario:", error);
            setError({ ...error, user: 'Usuario No valido :c' })
        })
    }, [ loader ])


    console.log(orders)

    return (
        <>
            {
                loader ? 
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loadingText}>Obteniendo Informacion</Text>
                </View> : null
            }
            {orders.length > 0 ? (
                <View style={styles.container}>
                    <Text style={styles.title}>Pedidos</Text>
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => ( // Asegúrate de usar paréntesis
                            <View style={styles.item}>
                                <Text style={styles.name}>Producto: {item.id_Product.name}</Text>
                                <Text>Categoría: {item.id_Product.category}</Text>
                                <Text>Cantidad: {item.quantity}</Text>
                                <Text>Estatus: {item.status ? "Completado" : "Pendiente"}</Text>
                                <Text>Subtotal: ${item.subtotal}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                </View>
            ) : (
                <Text style={styles.noOrders}>No hay pedidos disponibles</Text>
            )}
        
        </>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    list: {
        paddingBottom: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
        name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 100
        
    },
    loadingText: {
        marginTop: 20,
        color: '#fff',
        fontSize: 18,
    },
});


