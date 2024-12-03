
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../utils/firebase" 
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function AddUser(){


    function validarCorreo(correo) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    }

    function addUser({
        name = '',
        lastName = '',
        email = '',
        password = '',
        role = ''
    }){


        return new Promise( (resolve, reject) => {

            if(
                name === '' ||
                lastName === '' ||
                email === '' ||
                password === '' ||
                role === ''
            ){ resolve({ ok: false, msg: 'Valores no validos' }) }
            
            addDoc(collection(db, "users"), {
                name,
                last_name: lastName,
                correo: email,
                password,
                role
            })
            .then((docRef) => {
                console.log("Documento agregado con ID:", docRef.id);
                createUserWithEmailAndPassword(auth, value.email, value.password)
                .then( user => {
                    console.log(user.user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log('error', errorCode, errorMessage)
                })
                resolve({ ok: true, msg: "Documento agregado con ID: " + docRef.id })
            })
            .catch((error) => {
                console.error("Error al agregar documento:", error);
                reject( "Error al agregar documento: " + error )
            });


        } )

    }

    function agregarUsuario(){

        const newErrors = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            role: ''
        }

        if( value.name === '' ){ newErrors.name = 'Nombre no valido' }
        if( value.lastName === '' ){ newErrors.lastName = 'Apellidos no valido' }
        if( value.email === '' ){ newErrors.email = 'Correo no valido' }
        if( !validarCorreo(value.email) ){ newErrors.email = 'Correo no valido' }
        if( value.password.length < 6 ){ newErrors.password = 'Contrasena corta' }
        if( value.password === '' ){ newErrors.password = 'Contrasena no valido' }
        if( value.role === '' ){ newErrors.role = 'Role no valido' }

        console.log(newErrors)

        if(
            !newErrors.name
            && !newErrors.lastName
            && !newErrors.email
            && !newErrors.password
            && !newErrors.role
        ){

            addUser({
                name: value.name,
                lastName: value.lastName,
                email: value.email,
                password: value.password,
                role: value.role
            })
            .then( res => {
                console.log( res )
            } )
            .catch( e => {
                console.error(e)
            } )
        }

        setError(newErrors)

    }


    const [ error, setError ] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    })

    const [ value, setValue ] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    })

    function updateValue( key, newValue ){
        const newValueState = { ...value }
        newValueState[key] = newValue
        setValue( newValueState )
    }

    console.log(value)

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
                    <Text style={styles.label}>Apellidos:</Text>
                    <TextInput
                        style={[styles.input, error.lastName ? styles.inputError : null]}
                        placeholder="Ingresa los apellidos"
                        value={value.lastName}
                        onChangeText={ v => { updateValue('lastName', v) } }
                        />
                    <Text style={styles.errorText}>{error.lastName}</Text>
                </View>
                <View>    
                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        style={[styles.input, error.email ? styles.inputError : null]}
                        placeholder="Ingresa el correo"
                        value={value.email}
                        onChangeText={ v => { updateValue('email', v) } }
                        />
                    <Text style={styles.errorText}>{error.email}</Text>
                </View>
                <View>    
                    <Text style={styles.label}>Contarseña:</Text>
                    <TextInput
                        style={[styles.input, error.password ? styles.inputError : null]}
                        placeholder="Ingresa la contraseña"
                        value={value.password}
                        onChangeText={ v => { updateValue('password', v) } }
                        />
                    <Text style={styles.errorText}>{error.password}</Text>
                </View>
                <View>    
                    <Text style={styles.label}>Rol:</Text>
                    <TextInput
                        style={[styles.input, error.role ? styles.inputError : null]}
                        placeholder="Ingresa el rol"
                        value={value.role}
                        onChangeText={ v => { updateValue('role', v) } }
                        />
                    <Text style={styles.errorText}>{error.role}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={ agregarUsuario }>
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
});

