import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import colores from '../../utils/colores';
import { db } from '../../utils/firebase';  // Importa la configuración de Firebase
import { collection, addDoc,doc, updateDoc  } from 'firebase/firestore';
export default function AccionesMesa({ setVerMesas, mesaSeleccionada }) {
    const [cuentaAbierta, setCuentaAbierta] = useState(!mesaSeleccionada.estado)
    const AddSale = async (data) => {
        try {

            const docRef = await addDoc(collection(db, "sales"),data);

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
        const data= {
            date:fechaFormateada[0],
            time:fechaFormateada[1],
            total: 0,
            id_table: mesaSeleccionada.id,
        }
        console.log(data)
        setCuentaAbierta(!cuentaAbierta)
        //AddSale(data)
        actualizarMesa(mesaSeleccionada.id,true)

    }
    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%', flexDirection: 'column' }}>
            <Text>Acciones Mesa {mesaSeleccionada.id}</Text>
            <CajaAcciones titulo="Abrir Cuenta" funcion={abrirCuenta} estado={!cuentaAbierta}/>
            <CajaAcciones titulo="Agregar Pedidos" funcion={() => console.log('hola')} estado={cuentaAbierta} />
            <CajaAcciones titulo="Ver Pedidos Mesa" />
            <CajaAcciones titulo="Regresar" funcion={() => setVerMesas(true)} />
        </View>
    );
}

function CajaAcciones({ titulo, funcion, estado = false }) {
    return (
        <Pressable style={estado ? [styles.caja, styles.desabilidado] : styles.caja} onPress={funcion} disabled={estado}>
            <View>
                <Text style={styles.texto}>{titulo}</Text>
            </View>
        </Pressable>
    );
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
