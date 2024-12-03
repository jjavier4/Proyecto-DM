
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../utils/firebase" 
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";


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
        date= '',
        role = ''
    }){


        return new Promise( (resolve, reject) => {

            if(
                name === '' ||
                lastName === '' ||
                email === '' ||
                password === '' ||
                date === '' ||
                role === ''
            ){ resolve({ ok: false, msg: 'Valores no validos' }) }
            
            addDoc(collection(db, "users"), {
                name,
                last_name: lastName,
                correo: email,
                password,
                date,
                role
            })
            .then((docRef) => {
                console.log("Documento agregado con ID:", docRef.id);
                createUserWithEmailAndPassword(auth, value.email, value.password)
                .then( user => {
                    console.log(user.user)
                    Alert.alert("Usuario Agregado");
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
            date: '',
            role: ''
        }

        if( value.name === '' ){ newErrors.name = 'Nombre no valido' }
        if( value.lastName === '' ){ newErrors.lastName = 'Apellidos no valido' }
        if( value.email === '' ){ newErrors.email = 'Correo no valido' }
        if( !validarCorreo(value.email) ){ newErrors.email = 'Correo no valido' }
        if( value.password.length < 6 ){ newErrors.password = 'Contrasena corta' }
        if( value.password === '' ){ newErrors.password = 'Contrasena no valido' }
        if( value.date === '' ){ newErrors.date = 'Fecha no valida' }
        if( value.role === '' ){ newErrors.role = 'Role no valido' }

        console.log("Errores", newErrors)

        if(
            !newErrors.name
            && !newErrors.lastName
            && !newErrors.email
            && !newErrors.password
            && !newErrors.date
            && !newErrors.role
        ){

            addUser({
                name: value.name,
                lastName: value.lastName,
                email: value.email,
                password: value.password,
                date: value.date,
                role: value.role
            })
            .then( res => {
                console.log( res )
                Alert.alert('Usuario Agregado')
                setValue({
                    name: '',
                    lastName: '',
                    email: '',
                    password: '',
                    date: '',
                    role: 'Mesero',
                })
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
        date: '',
        role: ''
    })

    const [ value, setValue ] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        date: '',
        role: 'Mesero',
    })

    function updateValue( key, newValue ){
        const newValueState = { ...value }
        newValueState[key] = newValue
        setValue( newValueState )
    }


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        updateValue('date', new Date(date).toUTCString())
        hideDatePicker();
    };

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
                    <Button title={`${ value.date ? value.date : 'Fecha de nacimiento' }`} onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />    
                    <Text style={styles.errorText}>{error.date}</Text>
                </View>    
                <View>    
                    <Text style={styles.label}>Rol:</Text>    
                    <Picker
                        selectedValue={ 'Mesero' }
                        onValueChange={(itemValue, itemIndex) => updateValue('role', itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Mesero" value="Mesero" />
                        <Picker.Item label="Administrador" value="Admin" />
                    </Picker>
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
    picker: {
        width: '100%',
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
    },
});

