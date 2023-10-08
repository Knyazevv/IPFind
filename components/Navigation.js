import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import HomeScreen2 from '../screens/Home2';
import MapInfoScreen from '../components/MapInfo';
import Main from '../screens/Main';
import { StyleSheet } from 'react-native';


const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Main" component={Main} options={({ navigation }) => ({title: 'Search by IP'})}/>    */}

        <Stack.Screen name="Main" component={Main} options={{title: 'Search by IP', headerTitleAlign: 'center', }}
/>
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({title: 'ipgeolocation.io'})}/>   
        <Stack.Screen name="Home2" component={HomeScreen2} options={({ navigation }) => ({title: 'ip-api'})}/>        
        <Stack.Screen name="MapInfo" component={MapInfoScreen} options={({ navigation }) => ({title: 'Map Info'})}/>   

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    alignSelf: 'center', 
  },
});