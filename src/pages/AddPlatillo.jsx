

import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { db } from '../utils/firebase';
import { Picker } from "@react-native-picker/picker";



export default function AddPlatilllo(){




    function addPlatillo({
        name = '',
        category = '',
        price = ''
    }){

        return new Promise( (resolve, reject) => {
            
            if( 
                name === '' &&
                price === '' &&
                category === ''
            ){
                resolve({ok:false, msg: 'Valores no validos'})
            }

            addDoc(collection(db, "products"), {
                name,
                price,
                category
            })
            .then((docRef) => {
                console.log("Documento agregado con ID:", docRef.id);
                Alert.alert(`Platillo "${name}", agregado correctamente.`);
                resolve({ ok: true, msg: "Documento agregado con ID:" + docRef.id });
            })
            .catch((error) => {
                console.error("Error al agregar documento:", error);
                reject( "Error al agregar documento: " + error )
            });
        } )

    }


    function agregarPlatillo(){

        const newError = {
            name: '',
            category: '',
            price: ''
        }

        if( value.name === '' ){ newError.name = 'Nombre no valido' }
        if( value.category === '' ){ newError.category = 'Categoria no valida' }
        if( value.price === '' ){ newError.price = 'Precio no valida' }

        if(
            !newError.name 
            && !newError.price
            && !newError.category
        ){

            addPlatillo({
                name: value.name,
                price: value.price,
                category: value.category
            })
            .then( res => {
                console.log(res)
                setValue({
                    name: '',
                    category: 'Entrada',
                    price: ''
                })
            } )
            .catch( e => {
                console.log(e)
            } )
        } else { console.log('errores') }

        setError(newError)

    }

    const [error, setError] = useState({
        name: '',
        category: '',
        price: ''
    })
    
    const [value, setValue] = useState({
        name: '',
        category: 'Entrada',
        price: ''
    })


    function updateValue( key, newValue ){
        const newValueState = { ...value }
        newValueState[key] = newValue
        setValue( newValueState )
    }

    return (
        <>
            <View style={styles.container}>
                <View>    
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={[styles.input, error.name ? styles.inputError : null]}
                        placeholder="Ingresa el nombre"
                        value={value.name}
                        onChangeText={ v => { updateValue('name', v) } }
                        />
                    <Text style={styles.errorText}>{error.name}</Text>
                </View>
                <View>    
                    <Text style={styles.label}>Precio:</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={[styles.input, error.price ? styles.inputError : null]}
                        placeholder="Ingresa el precio"
                        value={value.price}
                        onChangeText={ v => { updateValue('price', v) } }
                        />
                    <Text style={styles.errorText}>{error.price}</Text>
                </View>
                <View>    
                    <Text style={styles.label}>Categoria:</Text>
                    <Picker
                        selectedValue={ 'Entrada' }
                        onValueChange={(itemValue, itemIndex) => updateValue('category', itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Entrada" value="Entrada" />
                        <Picker.Item label="Plato Fuerte" value="PlatoFuerte" />
                        <Picker.Item label="Bebida" value="Bebida" />
                        <Picker.Item label="postre" value="Postre" />
                    </Picker>
                    <Text style={styles.errorText}>{error.category}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={agregarPlatillo}>
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}





const styles = StyleSheet.create({
    container: {
      marginVertical: 20,
      paddingHorizontal: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      backgroundColor: '#f9f9f9',
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    picker: {
        width: '100%',
        height: 80,
        borderColor: '#000',
        borderWidth: 1,
    },
});

