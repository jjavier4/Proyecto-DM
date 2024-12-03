import * as React from 'react';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Text, View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ViewMesas from './mesas/viewMesas';
import Logout from './logout';
import { auth } from '../utils/firebase';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

function ProfileScreen2({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen 2</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function Aplicacion() {
    const [role, setRole] = useState(null);

    const obtenerRole = async () => {
        const storedRole = await SecureStore.getItemAsync('role');
        if (storedRole) {
            console.log("Rol recuperado desde Secure Store:", storedRole);
            setRole(storedRole);
        } else {
            console.log("No se encontró un rol en Secure Store.");
            setRole(null);
        }
    };

    useEffect(() => {
        const fetchRole = async () => {
            setTimeout( ()=> {
                obtenerRole()
            }, 1500 )
        };
      
        fetchRole()
    }, [auth.currentUser.uid]);

    if (role === null) return (
        <View style={styles.loaderContainer}>
            <Text style={styles.title}>La Fondita</Text>
            <Text style={styles.subtitle}>Obteniendo información</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )

    return (
        <Drawer.Navigator initialRouteName="Home">
            {role === 'Admin' ? (
                <>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                    <Drawer.Screen name="Mesas" component={ViewMesas} />
                    <Drawer.Screen name="Cerrar sesión" component={Logout} />
                </>
            ) : role === 'Mesero' ? (
                <>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Profile2" component={ProfileScreen2} />
                    <Drawer.Screen name="Cerrar sesión" component={Logout} />
                </>
            ) : null}
        </Drawer.Navigator>
    );
}








const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff', // Fondo blanco
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#000', // Negro
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: '#666', // Gris
      marginBottom: 20,
    },
  });
