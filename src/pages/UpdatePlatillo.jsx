

import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { db } from '../utils/firebase';

import { useFocusEffect, useRoute } from '@react-navigation/native';


export default function UpdatePlatillo(){

    function updatePlatillo({
        id = '',
        name = '',
        category = '',
        price = ''
    }){

        return new Promise( (resolve, reject) => {
            
            if( 
                id === '' &&
                name === '' &&
                price === '' &&
                category === ''
            ){
                resolve({ok:false, msg: 'Valores no validos'})
            }

            updateDoc(doc(db, "products", id), {
                name,
                price,
                category
            })
            .then(() => {
                console.log("Documento actualizado");
                resolve({ ok: true, msg: "Documento actualizado" });
            })
            .catch((error) => {
                console.error("Error al agregar documento:", error);
                reject( "Error al agregar documento: " + error )
            });
        } )

    }


    function actualizarPlatillo(){

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

            updatePlatillo({
                id: platilloId.current,
                name: value.name,
                price: value.price,
                category: value.category
            })
            .then( res => {
                console.log(res)
            } )
            .catch( e => {
                console.log(e)
            } )
        } else { console.log('errores') }

        setError(newError)

    }

    const route = useRoute();

    const platilloId = useRef('')

    const [ loader, setLoader ] = useState(true)

    useEffect(()=>{

        const { id } = route.params;

        platilloId.current = id
        
        const docRef = doc(db, "products", platilloId.current );
      
        getDoc(docRef)
        .then((docSnap) => {
            
            if (docSnap.exists()) {

                const data = docSnap.data()

                setValue({
                    name: data?.name,
                    price: data?.price,
                    category: data?.category
                })

                setLoader(false)


            } else {
                setError({ ...error, user: 'Usuario No valido' })
            }
        })
        .catch((error) => {
            console.error("Error al obtener el usuario:", error);
            setError({ ...error, user: 'Usuario No valido :c' })
        })

        return ()=> {
            console.log(platilloId.current, ' assa')
            setValue({})
        }

    }, [ route.params ])


    const [error, setError] = useState({
        name: '',
        category: '',
        price: ''
    })
    
    const [value, setValue] = useState({
        name: '',
        category: '',
        price: ''
    })


    function updateValue( key, newValue ){
        const newValueState = { ...value }
        newValueState[key] = newValue
        setValue( newValueState )
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
                    <TextInput
                        style={[styles.input, error.category ? styles.inputError : null]}
                        placeholder="Ingresa el nombre"
                        value={value.category}
                        onChangeText={ v => { updateValue('category', v) } }
                        />
                    <Text style={styles.errorText}>{error.category}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={actualizarPlatillo}>
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
});

