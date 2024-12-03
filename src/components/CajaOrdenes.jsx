import React from 'react'
import colores from '../utils/colores'
import { Text, View,StyleSheet } from 'react-native';

export default function CajaOrdenes({order}) {
    return (
        <View style={styles.caja}>

            <Text style={styles.texto}>Platillo: {order.id_Product.name}</Text>
            <Text style={styles.texto}>Cantidad: {order.quantity}</Text>

        </View>
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