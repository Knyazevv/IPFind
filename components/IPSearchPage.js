import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { useRoute } from '@react-navigation/native';
import { API_KEY } from '@env';

const IPSearchPage = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [result, setResult] = useState(null);


  const [searchedOnLoad, setSearchedOnLoad] = useState(false);

  // const route = useRoute();
  
  // const initialLat = route.params?.initialLat;
  // const initialLng = route.params?.initialLng;

  const navigation = useNavigation();

  const onMap = () => {   
    const initialLatFloat = parseFloat(result.latitude);
    const initialLngFloat = parseFloat(result.longitude);  
    
    navigation.navigate('MapInfo', {
      initialLat: initialLatFloat,
      initialLng: initialLngFloat,
    });
    console.log(initialLatFloat, initialLngFloat);
  };
  
  

  const searchIP = () => {    
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ipAddress}`)
    .then(function(response) {
      response.json().then(jsonData => {
        setResult(jsonData); 
      });
    })
    .catch(function(error) {
      console.log(error)
    });
  };



  useEffect(() => {
    if (!searchedOnLoad) {
      searchIP();
      setSearchedOnLoad(true);
    }
  }, []);

  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 20, margin: 10, textAlign: 'center' }}>Пошук за IP-адресою</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 1, padding: 5, textAlign: 'center' }}
        placeholder="Введіть IP-адресу"
        onChangeText={(text) => setIpAddress(text)}
        value={ipAddress}
      />
      <Button title="Пошук" onPress={searchIP}  />
      {result !== null ? (
        <View style={{ margin: 20 }}>

          <Text style={styles.text}>Інформація про IP-адресу:</Text>
          <Text>{"IP: " + result.ip}</Text>
          <Text>{"Country: " + result.country_name}</Text>
          <Text>{"State prov: " + result.state_prov}</Text>
          <Text>{"City: " + result.city}</Text>
          <Text>{"Latitude: " + result.latitude}</Text>
          <Text>{"Longitude: " + result.longitude}</Text>
          <Text>{"Time zone: " + result.time_zone.current_time}</Text>
          <Text>{"IPS: " + result.isp}</Text>
          <Text>{"Currency: " + result.currency.code}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Country flag: </Text>
          <Image source={{ uri: result.country_flag }} style={{ width: 30, height: 20 }} />
          </View>

        </View>
      ) : null}
          <View >
          <Button  title="Показати на карті" onPress={onMap} />
          </View>
    </View>
  );
};

export default IPSearchPage;



const styles = StyleSheet.create({
  container: {    
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
 
});