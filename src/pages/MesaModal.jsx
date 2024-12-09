import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function MesaModal({ 
    visible, 
    onClose, 
    onAccept,
    id = -1,
    identificadorProp,
    asientosProp 
}) {
  const [identificador, setIdentificador] = useState(identificadorProp);
  const [asientos, setAsientos] = useState(asientosProp);

  const handleAccept = () => {

    if( asientos < 2 ) {
      
      alert('El numeor de asientos no es valido.');

    } else if (identificador && asientos) {

      onAccept({ id, identificador, asientos });
      setIdentificador('');
      setAsientos('');

    } else {
      alert('Por favor, complete todos los campos');
    }
  };

  console.log( identificadorProp, identificador )

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{ id === -1 ? "Agregar Mesa": `Modificar Mesa (${identificador})` }</Text>
          <TextInput
            style={styles.input}
            placeholder="Identificador"
            value={`${identificador}`}
            onChangeText={setIdentificador}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de Asientos"
            value={asientos}
            onChangeText={setAsientos}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <Button title="Aceptar" onPress={handleAccept} />
            <Button title="Cerrar" onPress={onClose} color="gray" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
