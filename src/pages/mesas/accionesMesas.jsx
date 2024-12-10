import React, { useState,useEffect } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import colores from '../../utils/colores';
import { db } from '../../utils/firebase';  // Importa la configuración de Firebase
import { collection, addDoc, doc, updateDoc,onSnapshot } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import CajaAcciones from '../../components/CajaAcciones';
export default function AccionesMesas({ navigation }) {
    const route = useRoute();

    // Acceder a las propiedades pasadas
    const { mesaSeleccionada } = route.params;
    const [cuentaAbierta, setCuentaAbierta] = useState(!mesaSeleccionada.estado)
    const AddSale = async (data) => {
        try {

            const docRef = await addDoc(collection(db, "sales"), data);

            console.log("Documento agregado con ID: ", docRef.id);
        } catch (e) {
            console.error("Error al agregar documento: ", e);
        }
    };
    async function actualizarMesa(mesaId, nuevoCampo) {
        const mesaRef = doc(db, 'tables', mesaId);
        try {

            await updateDoc(mesaRef, {
                estado: nuevoCampo,
            });
            console.log('Documento actualizado');
        } catch (e) {
            console.error('Error actualizando el documento: ', e);
        }
    }
    function abrirCuenta() {
        console.log('Se abrio la cuenta')
        const fechaHoraActual = new Date().toLocaleString();
        const fechaFormateada = fechaHoraActual.split(' ')
        console.log(fechaFormateada);
        const data = {
            date: fechaFormateada[0],
            time: fechaFormateada[1],
            total: 0,
            id_table: mesaSeleccionada.id,
            status: true
        }
        console.log(data)
        setCuentaAbierta(!cuentaAbierta)
        AddSale(data)
        actualizarMesa(mesaSeleccionada.id, true)

    }
    useEffect(() => {
        // Referencia al documento
        const mesaRef = doc(db, 'tables', mesaSeleccionada.id);

        // Suscribirse a los cambios del documento
        const unsubscribe = onSnapshot(
            mesaRef,
            (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const mesaData = { id: docSnapshot.id, ...docSnapshot.data() };
                    console.log(mesaData); // Aquí tienes los datos del documento
                    setCuentaAbierta(!mesaData.estado)
                } else {
                    console.log("El documento no existe.");
                }
            },
            (error) => {
                console.error("Error al escuchar los cambios:", error);
            }
        );

        // Limpiar la suscripción al desmontar el componente
        return () => unsubscribe();
    }, [mesaSeleccionada]);

    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%', flexDirection: 'column' }}>
            <Text>Acciones Mesa {mesaSeleccionada.id}</Text>
            <CajaAcciones titulo="Abrir Cuenta" funcion={abrirCuenta} estado={!cuentaAbierta} />

            <CajaAcciones
                titulo="Agregar Pedidos"
                funcion={() => navigation.navigate('AgregarPedidos', {
                    idMesa: mesaSeleccionada.id
                })}
                estado={cuentaAbierta} />

            <CajaAcciones
                titulo="Ver Pedidos Mesa"
                funcion={() => navigation.navigate('VerPedidosMesa', {
                    idMesa: mesaSeleccionada.id
                })}
                estado={cuentaAbierta} />

            <CajaAcciones
                titulo="Generar Ticket"
                funcion={() => navigation.navigate('GenerarTicket', {
                    idMesa: mesaSeleccionada.id
                })}
                estado={cuentaAbierta} />
            <CajaAcciones
                titulo="Regresar"
                funcion={() => navigation.navigate('VerMesas', {
                    idMesa: mesaSeleccionada.id
                })}
                estado={false} />
        </View>
    )
}
const styles = StyleSheet.create({
    caja: {
        backgroundColor: colores.tercer_color,
        width: '70%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 20
    },
    desabilidado: {
        backgroundColor: colores.cuarto_color
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
