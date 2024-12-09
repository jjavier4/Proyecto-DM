import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../utils/firebase'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//componentes
import AccionesMesa from './accionesMesas'
import Mesa from '../../components/Mesa';
import AgregarPedido from './agregarPedido';
import VerPedidosMesa from './verPedidosMesa';
import CerrarCuenta from './cerrarCuenta';
const Stack = createNativeStackNavigator();
export default function ViewMesas() {

    return (
        <Stack.Navigator initialRouteName="VerMesas">
            <Stack.Screen name="VerMesas" component={VerMesas} options={{ headerShown: false }} />
            <Stack.Screen name="AccionesMesa" component={AccionesMesa} options={{ headerShown: false }} />
            <Stack.Screen name="AgregarPedidos" component={AgregarPedido} options={{ headerShown: false }} />
            <Stack.Screen name="VerPedidosMesa" component={VerPedidosMesa} options={{ headerShown: false }} />
            <Stack.Screen name="GenerarTicket" component={CerrarCuenta} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function VerMesas({ navigation, setVerMesas, setMesaSeleccionada }) {
    const [mesas, setMesas] = useState([]);
    function moverAccionMesa(mesaSeleccionada) {
        navigation.navigate('AccionesMesa', {
            mesaSeleccionada: mesaSeleccionada
        })
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "tables"),
            (querySnapshot) => {
                const mesasArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMesas(mesasArray);
            },
            (error) => {
                console.error("Error al escuchar los cambios:", error);
            }
        );


        return () => unsubscribe();
    }, []);
    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                <Text style={styles.titulo} >Vista mesas</Text>
                <View style={styles.contenedorMesas}>
                    {
                        mesas.map((mesa, index) => (
                            <Mesa key={index}
                                mesa={mesa}
                                number={index + 1}
                                accionNavegar={() => moverAccionMesa(mesa)} />
                        ))
                    }
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contenedorMesas: {
        flexDirection: 'row',
        gap: 10,
        width: '90%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

