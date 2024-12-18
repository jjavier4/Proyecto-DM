import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import CajaAcciones from '../../components/CajaAcciones';
import { collection, onSnapshot, query, where, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import CajaProductos from '../../components/CajaProductos';
import CajaOrdenes from '../../components/CajaOrdenes';
import { useRoute } from '@react-navigation/native';

export default function VerPedidosMesa() {
    const route = useRoute();

    // Acceder a las propiedades pasadas
    const { idMesa } = route.params;
    const [sales, setSales] = useState([]); // Cambié el nombre a 'sales' para indicar que es un array
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Obtener las ventas activas para la mesa
        const productosRef = collection(db, 'sales');
        const q = query(
            productosRef,
            where('id_table', '==', idMesa),
            where('status', '==', true)
        );

        const unsubscribeSales = onSnapshot(
            q,
            (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const salesData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setSales(salesData);
                } else {
                    console.log('No se encontraron ventas activas para esta mesa.');
                    setSales([]);
                }
            },
            (error) => {
                console.error('Error al obtener las ventas:', error);
            }
        );

        return () => unsubscribeSales(); // Limpieza del listener
    }, [idMesa]);

    useEffect(() => {
        if (sales.length > 0) {
            // Si hay ventas, obtener las órdenes asociadas a la primera venta
            const firstSale = sales[0];
            const OrderRef = collection(db, 'orders');
            const q = query(
                OrderRef,
                where('id_Sale', '==', firstSale.id)
            );

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

            return () => unsubscribeOrders(); // Limpieza del listener
        }
    }, [sales]);

    const eliminarPedido = async (id) => {
        try {
            // Crea una referencia al documento
            const docRef = doc(db, 'orders', id);

            // Elimina el documento
            await deleteDoc(docRef);
            console.log('Documento eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el documento:', error);
        }
    };


    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                <Text>Ver Pedidos Mesa</Text>
                {
                    orders.map((order, index) => (
                        <CajaOrdenes key={index} order={order} eliminarPedido={eliminarPedido} />
                    ))
                }

                {console.log('Datos de la mesa:', idMesa)}
                {console.log('Ventas:', sales)}
                {console.log('Órdenes:', orders)}
            </View>
        </ScrollView>
    );
}
