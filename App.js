import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Aplicacion from './src/pages/aplicacion';
import Login from './src/pages/login';
export default function App() {
  const log = true
  return (
    <View style={styles.container}>
      {
        log?  <Aplicacion />:<Login />
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
