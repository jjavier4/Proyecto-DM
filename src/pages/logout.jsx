import React, { useEffect } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import app from '../utils/firebase';

export default function Logout() {
    useEffect(() => {
        const auth = getAuth(app);
        signOut(auth)
            .then(() => {
                Alert.alert('Sesión cerrada', 'Has cerrado sesión exitosamente.');
            })
            .catch((error) => {
                console.error('Error al cerrar sesión:', error);
                Alert.alert('Error', 'No se pudo cerrar la sesión.');
            });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}