import React from 'react'
import colores from '../utils/colores'
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function CajaOrdenes({ order,eliminarPedido }) {
    return (
        <View style={styles.contenedorProductos}>
            <View style={styles.producto}>
                <Text style={styles.texto}>Platillo: {order.id_Product.name}</Text>
                <Text style={styles.texto}>Cantidad: {order.quantity}</Text>
            </View>
            <View style={styles.producto}>
                <Pressable
                style={styles.boton}
                onPress={()=>eliminarPedido(order.id)}
                >
                    <Text style={styles.textoboton}>Eliminar</Text>
                </Pressable>
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
});