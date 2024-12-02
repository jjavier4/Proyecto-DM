import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ViewMesas from './mesas/viewMesas';
function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}



function ProfileScreen2({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}
const Drawer = createDrawerNavigator();


export default function Aplicacion() {
    const role = true
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                {
                    role ?
                        <>
                            <Drawer.Screen name="Home" component={HomeScreen} />
                            <Drawer.Screen name="Profile" component={ProfileScreen} />
                            <Drawer.Screen name="Mesas" component={ViewMesas} />
                            
                        </> :
                        <>
                            <Drawer.Screen name="Home" component={HomeScreen} />
                            <Drawer.Screen name="Profile" component={ProfileScreen} />
                            <Drawer.Screen name="Profile2" component={ProfileScreen2} />
                            
                        </>
                }

            </Drawer.Navigator>
        </NavigationContainer>
    );
}
