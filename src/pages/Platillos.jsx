

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Button, Alert } from 'react-native'
import { db } from '../utils/firebase';

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';


export default function Platillos(){


    const [ loader, setLoader ] = useState(true)

    const [ platillos, setPlatillos ] = useState([]) 

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

        getDocs(collection(db, "products"))
        .then((docSnap) => {
            
            setPlatillos(
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

    function actualizarProducto(id){
        navigation.navigate('Actualizar Platillo', { id })
    }

    function borrarPlatillo( id ){

        deleteDoc(doc(db, 'products', id))
        .then( ()=> {
            console.log('Documento Eliminado')
            Alert.alert("Platillo Eliminado");
            setLoader(true)
        } )
        .catch( (e)=> {
            console.log(e)
        } )

    }

    return (
        <>
            {
                loader ? 
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loadingText}>Obteniendo Informacion</Text>
                </View> : null
            }
            
            <View style={styles.container}>
                <FlatList
                    data={platillos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.textContainer}>
                        <Text style={styles.text}>Id: {item.id}</Text>
                        <Text style={styles.text}>Nombre: {item.name}</Text>
                        <Text style={styles.text}>Precio: ${item.price}</Text>
                        <Text style={styles.text}>Categoría: {item.category}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                        <Button title="Actualizar" onPress={() => { actualizarProducto(item.id) }} />
                        <Button
                            title="Borrar"
                            color="red"
                            onPress={() => borrarPlatillo(item.id)}
                        />
                        </View>
                    </View>
                    )}
                />
            </View>

        </>
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9", // Fondo claro para contraste
    },
    itemContainer: {
        gap: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    textContainer: {
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#333", // Texto oscuro
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
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

