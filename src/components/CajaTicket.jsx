import React, { useState } from 'react'
import colores from '../utils/colores'
import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';

export default function CajaTicket({ order}) {
    const [quantity, setQuantity] = useState(0)
    return (
        <View style={styles.contenedorProductos}  >
            <View style={styles.producto}>
            <Text style={styles.texto}>Platillo: {order.id_Product.name}</Text>
            <Text style={styles.texto}>Cantidad: {order.quantity}</Text>
            <Text style={styles.texto}>Platillo: {order.id_Product.price}</Text>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    contenedorProductos: {
        flexDirection: 'row',
        backgroundColor: colores.segundo_color,
        width: '90%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderRadius: 10,
        marginBottom: 10,
    },
    producto: {
        width: '48%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textoboton: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    boton: {
        backgroundColor: colores.color_botones,
        width: '70%',
        height: '40%',
        borderRadius: 10,
        justifyContent: 'center',
    },
    desabilidato: {
        backgroundColor: 'red'
    },
    txtInput: {
        width: '70%',
        height: '40%',
        borderWidth: 2,
        borderRadius: 10
    }

});