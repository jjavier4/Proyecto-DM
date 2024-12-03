import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/login';
import RecoverPasswordScreen from './src/pages/recuperarPassword';
import Aplicacion from './src/pages/aplicacion'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './src/utils/firebase';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
  }, []);

  if (user === undefined) return null; // Mientras se valida el usuario, no renderiza nada

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {user ? (
        <Aplicacion />
      ) : (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Recuperar Contraseña" component={RecoverPasswordScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
