import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { API_KEY } from '@env';

const IPSearchPage2 = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [result, setResult] = useState(null);


  const route = useRoute();
  
  const initialLat = route.params?.initialLat;
  const initialLng = route.params?.initialLng;

  const navigation = useNavigation();

  const onMap = () => {   
    const initialLatFloat = parseFloat(result.lat);
    const initialLngFloat = parseFloat(result.lon);  
    
    navigation.navigate('MapInfo', {
      initialLat: initialLatFloat,
      initialLng: initialLngFloat,
    });
    console.log(initialLatFloat, initialLngFloat);
  };
  
  

  const searchIP = () => {    
    fetch(`http://ip-api.com/json/${ipAddress}`)
    .then(function(response) {
      response.json().then(jsonData => {
        setResult(jsonData); 
      });
    })
    .catch(function(error) {
      console.log(error)
    });
  };

  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 20, margin: 20 }}>Пошук за IP-адресою</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        placeholder="Введіть IP-адресу"
        onChangeText={(text) => setIpAddress(text)}
        value={ipAddress}
      />
      <Button title="Пошук" onPress={searchIP} />
      {result !== null ? (
        <View style={{ margin: 20 }}>

          <Text style={styles.text}>Інформація про IP-адресу:</Text>
          <Text >{"IP: " + result.query}</Text> 
          <Text>{"Country: " + result.country}</Text>        
          <Text>{"Region: " + result.region}</Text> 
          <Text>{"Latitude: " + result.lat}</Text>
          <Text>{"Longitude: " + result.lon}</Text>
          <Text>{"Time zone: " + result.timezone}</Text>
          <Text>{"Provider: " + result.isp}</Text>
          <Text>{"currency: " + result.as}</Text> 

         
          <View style={styles.container}>
          <Button  title="Показати на карті" onPress={onMap} />
          </View> 
        </View>
      ) : null}
    </View>
  );
};

export default IPSearchPage2;



const styles = StyleSheet.create({
  container: {    
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    
  },
 
 
});