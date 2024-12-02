import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

export default function Login() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>La Fondita</Text>
        <Image
            style={styles.logo}
            source={{ uri: 'https://your-image-url-here.com/logo.png' }} 
        />
        <TextInput
            style={styles.input}
            placeholder="Identificador de empleado"
            placeholderTextColor="#fff"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar formulario</Text>
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
});
