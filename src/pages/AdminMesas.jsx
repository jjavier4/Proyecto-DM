import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db,  } from '../utils/firebase';
import MesaModal from './MesaModal';


export default function AdminMesas() {
    const [tables, setTables] = useState([]);

    const [ tableSelected, setTableSelected ] = useState({ id: null })
    
    
    // Escucha en tiempo real de la colección "tables"
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'tables'), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTables(data);
        });
        return () => unsubscribe();
    }, []);

    // Borrar mesa
    const deleteTable = async (id) => {
        try {
            await deleteDoc(doc(db, 'tables', id));
        } catch (error) {
            Alert.alert('Error', 'No se pudo borrar la mesa');
        }
    };


    function closeModal(){
        setTableSelected({id: null})
    }

    function addTable({ identificador, asientos }){

      addDoc(collection(db, "tables"), { table: identificador, asientos, estado: false })
      .then( res => {
        Alert.alert(`Mesa "${identificador}" agregada!!!`);
      } )
      .catch( e => {
          console.log(e)
      } )

      closeModal()
    }
    
    function updateTable({ id, identificador, asientos }){
        

        updateDoc(doc(db, "tables", id), { table: identificador, asientos, estado: false })
        .then( res => {
          Alert.alert(`Mesa "${identificador}" actualizada!!!`);
        } )
        .catch(e => {
          console.log(e)
        })

        closeModal()
    }


    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
                <Text style={styles.itemText}>Mesa {item.table}</Text>
                <Text style={styles.itemText}>Asientos: {item.asientos}</Text>
                {item.estado ? (
                <Text style={styles.occupiedText}>La mesa está ocupada, no se puede modificar</Text>
                ) : (
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                    style={styles.modifyButton}
                    // onPress={() => modifyTable(item.id, item.table, item.asientos)}
                    onPress={() => setTableSelected({id: item.id, table: item.table, asientos: item.asientos, action: updateTable}) }
                    >
                    <Text style={styles.buttonText}>Modificar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTable(item.id)}
                    >
                    <Text style={styles.buttonText}>Borrar</Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>
        </View>
    );

    return (
        <>
            {
                tableSelected?.id ? 
                <MesaModal
                    onClose={closeModal}
                    onAccept={tableSelected.action}
                    id={ tableSelected.id }
                    asientosProp={ tableSelected.asientos }
                    identificadorProp={ tableSelected.table }
                /> : null
            }
            <View style={styles.container}>
            <Text style={styles.title}>Administrar Mesas</Text>
            <TouchableOpacity style={styles.addButton} onPress={()=> { setTableSelected({id: -1, table: '', asientos: '', action: addTable}) }}>
                <Text style={styles.buttonText}>Agregar Mesa</Text>
            </TouchableOpacity>
            <FlatList
                data={tables}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  occupiedText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modifyButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
