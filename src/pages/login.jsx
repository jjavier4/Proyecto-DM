import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { validateEmail } from '../utils/validateEmail';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import app from '../utils/firebase';
import {db} from '../utils/firebase';

export default function Login({ navigation }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    async function getUserByEmail(email) {
        try {
            const usersRef = collection(db, "users"); 
            const consulta = query(usersRef, where("correo", "==", email)); 
            const result = await getDocs(consulta);
    
            if (!result.empty) {
                result.forEach(async (doc) => {
                    console.log("Usuario encontrado:", doc.id);
                    const { role } = doc.data();
                    if (role) {
                        await SecureStore.setItemAsync('role', role);
                    } else {
                        Alert.alert("Error","El usuario no tiene un rol asignado");
                    }
                });
            } else {
                Alert.alert("Error","No se encontró ningún usuario con este email");
            }
        } catch (error) {
            Alert.alert("Error",error);
        }
    }

    const login = async () => {
        let errors = {};
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password.length < 6) {
            errors.password = true;
        } else {
            const auth = getAuth(app);
            try {
                const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                const email = userCredential.user.email;
                await getUserByEmail(email); 
            } catch (error) {
                Alert.alert(`Error ${error.code}`, error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>La Fondita</Text>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#fff"
                onChange={e => setFormData({ ...formData, email: e.nativeEvent.text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChange={e => setFormData({ ...formData, password: e.nativeEvent.text })}
            />
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('Recuperar Contraseña')}
            >
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e001c',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: '#ffd700',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 75,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#640032',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 15,
    },
    forgotPasswordText: {
        color: '#ffd700', // Amarillo
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
