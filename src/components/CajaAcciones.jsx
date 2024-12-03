import React from 'react'
import colores from '../utils/colores'
import { Text, View, Pressable, StyleSheet } from 'react-native';

export default function CajaAcciones({ titulo, funcion, estado = false }) {
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