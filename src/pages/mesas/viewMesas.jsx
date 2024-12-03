import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../utils/firebase'
//componentes
import Mesa from '../../components/Mesa';
import Mesas from './mesas';
export default function ViewMesas({ navigation }) {
    const [verMesas, setVerMesas] = useState(true)
    const [mesaSeleccionada,setMesaSeleccionada] = useState(null)
    return (
        <>

            {verMesas ? 
            <VerMesas setVerMesas={setVerMesas} setMesaSeleccionada={setMesaSeleccionada}/> : 
            <Mesas setVerMesas={setVerMesas} mesaSeleccionada={mesaSeleccionada}/>}

        </>
    )
}

function VerMesas({setVerMesas,setMesaSeleccionada}) {
    const [mesas, setMesas] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "tables"),
            (querySnapshot) => {
                const mesasArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMesas(mesasArray);
            },
            (error) => {
                console.error("Error al escuchar los cambios:", error);
            }
        );


        return () => unsubscribe();
    }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            <Text style={styles.titulo} >Vista mesas</Text>
            <View style={styles.contenedorMesas}>
                {
                    mesas.map((mesa, index) => (
                        <Mesa key={index} 
                        mesa={mesa} 
                        number={index + 1} 
                        setVerMesas={setVerMesas} 
                        setMesaSeleccionada={setMesaSeleccionada}/>
                    ))
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contenedorMesas: {
        flexDirection: 'row',
        gap: 10,
        width: '90%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

