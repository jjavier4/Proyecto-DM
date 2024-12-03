import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import colores from '../../utils/colores';
import { db } from '../../utils/firebase';  // Importa la configuración de Firebase
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import CajaAcciones from '../../components/CajaAcciones';

export default function AccionesMesa({ setVerMesas, mesaSeleccionada, cambiarVentana }) {
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
    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%', flexDirection: 'column' }}>
            <Text>Acciones Mesa {mesaSeleccionada.id}</Text>
            <CajaAcciones titulo="Abrir Cuenta" funcion={abrirCuenta} estado={!cuentaAbierta} />
            <CajaAcciones titulo="Agregar Pedidos" funcion={() => { cambiarVentana('agregarPedidos') }} estado={cuentaAbierta} />
            <CajaAcciones titulo="Ver Pedidos Mesa" funcion={() => { cambiarVentana('verPedidos') }} estado={cuentaAbierta} />
            <CajaAcciones titulo="Generar Ticket" funcion={() => { cambiarVentana('ticket') }} />
            <CajaAcciones titulo="Regresar" funcion={() => setVerMesas(true)} />
        </View>
    )
}


