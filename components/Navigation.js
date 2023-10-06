import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import MapScreen from '../screens/Map';
import MapInfoScreen from '../components/MapInfo';


const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({title: 'IPSearchPage'})}/>   
        <Stack.Screen name="Map" component={MapScreen} options={({ navigation }) => ({title: 'Map'})}/>   
        <Stack.Screen name="MapInfo" component={MapInfoScreen} options={({ navigation }) => ({title: 'Map Info'})}/>   

      </Stack.Navigator>
    </NavigationContainer>
  );
};