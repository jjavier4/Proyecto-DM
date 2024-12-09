import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, } from 'react-native';
import CajaAcciones from '../../components/CajaAcciones';
import { collection, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import CajaProductos from '../../components/CajaProductos';
import CajaOrdenes from '../../components/CajaOrdenes';
import CajaTicket from '../../components/CajaTicket';
import { useRoute } from '@react-navigation/native';
export default function CerrarCuenta() {
    const route = useRoute();

    // Acceder a las propiedades pasadas
    const { idMesa } = route.params;

    const [productos, setProductos] = useState([]);
    const [sale, setSale] = useState([]);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0); // Estado para almacenar el total calculado

    useEffect(() => {
        obtenerSale(idMesa);
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
                    const saleData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setSale(saleData);
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

    const actualizarSale = async () => {
        if (sale.length > 0) {
            const saleId = sale[0].id;
            const datosActualizados = {
                status: false,
            };

            try {
                const saleRef = doc(db, 'sales', saleId);
                await updateDoc(saleRef, datosActualizados);
                console.log('Venta actualizada correctamente');
            } catch (error) {
                console.error('Error al actualizar la venta:', error);
            }
        } else {
            console.log('No hay venta para actualizar.');
        }
    };

    const actualizarMesa = async () => {
        const dataStatusMesa = { estado: false };

        try {
            const saleRef = doc(db, 'tables', idMesa);
            await updateDoc(saleRef, dataStatusMesa);
            console.log('Mesa actualizada Correctamente');
        } catch (error) {
            console.error('Error al actualizar la mesa:', error);
        }
    };

    useEffect(() => {
        if (sale.length > 0) {
            actualizarSale();
            actualizarMesa();

            const firstSale = sale[0];
            const OrderRef = collection(db, 'orders');
            const q = query(OrderRef, where('id_Sale', '==', firstSale.id));

            const unsubscribeOrders = onSnapshot(
                q,
                (querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const ordersData = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setOrders(ordersData);
                    } else {
                        console.log('No se encontraron órdenes para esta venta.');
                        setOrders([]);
                    }
                },
                (error) => {
                    console.error('Error al obtener las órdenes:', error);
                }
            );

            return () => unsubscribeOrders();
        }
    }, [sale]);

    // Calcular el total cuando cambian las órdenes
    useEffect(() => {
        const totalCalculado = orders.reduce((acc, order) => acc + (order.subtotal || 0), 0);
        setTotal(totalCalculado);
    }, [orders]);

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                {console.log('mensaje desde cerrar cuenta', idMesa)}
                {console.log(sale)}
                {console.log(orders)}
                {orders.map((order, index) => (
                    <CajaTicket key={index} order={order} />
                ))}
                
                <Text style={styles.titulo}>Total: ${total}</Text>

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
