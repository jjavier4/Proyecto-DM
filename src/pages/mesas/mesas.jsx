import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import colores from '../../utils/colores';
import { db } from '../../utils/firebase';  // Importa la configuración de Firebase
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import AgregarPedido from './agregarPedido';
import AccionesMesa from './accionesMesa';
import VerPedidosMesa from './verPedidosMesa';
export default function Mesas({ setVerMesas, mesaSeleccionada }) {
    // Estado para controlar qué pantalla mostrar
    const [ventanas, setVentanas] = useState({
        acciones: true,
        agregarPedidos: false,
        verPedidos: false,
    });

    // Función para manejar la navegación entre ventanas
    const cambiarVentana = (nuevaVentana) => {
        setVentanas({
            acciones: nuevaVentana === 'acciones',
            agregarPedidos: nuevaVentana === 'agregarPedidos',
            verPedidos: nuevaVentana === 'verPedidos',
        });
    };
    return (
        <>
            {

                ventanas.acciones && (
                    <AccionesMesa
                        setVerMesas={setVerMesas}
                        mesaSeleccionada={mesaSeleccionada}
                        cambiarVentana={cambiarVentana} // Pasamos la función al componente
                    />
                )
            }
            {

                ventanas.agregarPedidos && (
                    <AgregarPedido
                        idMesa={mesaSeleccionada.id}
                        cambiarVentana={cambiarVentana}
                    />
                )
            }
            {

                ventanas.verPedidos && (
                    <VerPedidosMesa
                        idMesa={mesaSeleccionada.id}
                        cambiarVentana={cambiarVentana}
                    />
                )
            }
        </>
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
