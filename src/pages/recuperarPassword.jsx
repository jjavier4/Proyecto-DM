import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../utils/firebase';

export default function RecoverPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const resetearPassword = () => {
        if (!email) {
        Alert.alert('Error', 'Por favor, introduce un correo electrónico válido.');
        return;
        }

        const auth = getAuth(app);
        sendPasswordResetEmail(auth, email)
        .then(() => {
            Alert.alert(
            'Correo enviado',
            'Se ha enviado un correo de recuperación de contraseña. Revisa tu bandeja de entrada.'
            );
            navigation.goBack();
        })
        .catch((error) => {
            console.error(error);
            Alert.alert('Error', 'No se pudo enviar el correo. Verifica el email ingresado.');
        });
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
        <Text style={styles.instructions}>
            Ingresa tu correo electrónico registrado
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={styles.button} onPress={resetearPassword}>
            <Text style={styles.buttonText}>Enviar enlace</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Volver</Text>
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
        fontSize: 28,
        color: '#ffd700',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructions: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
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
    backButton: {
        marginTop: 15,
    },
    backButtonText: {
        color: '#ffd700', 
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
