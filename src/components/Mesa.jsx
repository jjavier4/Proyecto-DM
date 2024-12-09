import React from 'react'
import { Text, View, Button, Image, StyleSheet, Pressable } from 'react-native';
import colores from '../utils/colores';

export default function Mesa({ mesa, number,accionNavegar }) {

    return (
        <Pressable style={styles.mesa} onPress={()=>{console.log(`Se preciono la mesa ${number}`);accionNavegar() }}>
            <Image
                source={require('../../assets/imagenMesas.png')}
                style={styles.imagen}
            />
            <Text>Mesa {number}</Text>
            <View style={mesa.estado ? styles.estado : [styles.estado, styles.false]}></View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    mesa: {
        width: '48%',
        height: 150,
        backgroundColor: colores.segundo_color,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10
    },
    imagen: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
    },
    estado: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red'
    },
    false: {
        backgroundColor: 'green'
    }
})
