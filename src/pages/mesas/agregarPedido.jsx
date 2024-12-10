import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { collection, onSnapshot, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import CajaProductos from '../../components/CajaProductos';
import { useNavigation, useRoute } from '@react-navigation/native';
import CajaAcciones from '../../components/CajaAcciones';

export default function AgregarPedido() {
    const route = useRoute();

    // Acceder a las propiedades pasadas
    const { idMesa } = route.params;
    const [productos, setProductos] = useState([]);
    const [sale, setSale] = useState([]);

    useEffect(() => {
        const unsubscribeProductos = onSnapshot(
            collection(db, 'products'),
            (querySnapshot) => {
                const mesasArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductos(mesasArray);
            },
            (error) => {
                console.error('Error al escuchar los cambios de productos:', error);
            }
        );

        obtenerSale(idMesa);

        return () => {
            unsubscribeProductos();
        };
    }, [idMesa]);


    function obtenerSale(idMesa) {
        const productosRef = collection(db, 'sales');
        const q = query(
            productosRef,
            where('id_table', '==', idMesa),
            where('status', '==', true)
        );

        const unsubscribeSale = onSnapshot(
            q,
            (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const sale = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setSale(sale);
                } else {
                    console.log('No se encontraron ventas activas para esta mesa.');
                }
            },
            (error) => {
                console.error('Error al obtener la venta:', error);
            }
        );

        return () => unsubscribeSale();
    }

    const agregarProducto = async (data) => {
        try {
            const coleccionRef = collection(db, 'orders');
            const docRef = await addDoc(coleccionRef, data);
            console.log('Producto agregado con ID:', docRef.id);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    };


    function prepararDatos(Product, quantity) {
        if (sale.length === 0) {
            console.log('No hay ventas activas para esta mesa.');
            return;
        }

        const subtotal = quantity * Product.price;
        const dataOrder = {
            id_Product: Product,
            id_Sale: sale[0].id,
            quantity: quantity,
            status: false,
            subtotal: subtotal,
        };
        console.log(dataOrder);
        agregarProducto(dataOrder);
    }

    const navigate = useNavigation()

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                {console.log('ID de la Mesa:', idMesa)}
                {sale.length > 0 && console.log('ID de la Venta:', sale[0].id)}

                <Text style={styles.titulo}>Agregar Producto</Text>
                <CajaAcciones
                    titulo="Regresar"
                    funcion={() => navigate.navigate('VerMesasc', {
                        idMesa: idMesa
                    })}
                    estado={false} 
                />

                {/* Verificación si productos está vacío antes de mapear */}
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <CajaProductos key={producto.id} producto={producto} onPress={prepararDatos} />
                    ))
                ) : (
                    <Text>No hay productos disponibles.</Text>
                )}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
