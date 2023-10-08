import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { API_KEY } from '@env';
import * as Font from 'expo-font';



const IPSearchPage = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [result, setResult] = useState(null);


  async function loadFonts() {
    await Font.loadAsync({
      'Pacifico-Regular': require('../assets/PTSerif-BoldItalic.ttf'),
    });
  }

  useEffect(() => {
    loadFonts(); 
  }, []);

  const route = useRoute();
  
  const initialLat = route.params?.initialLat;
  const initialLng = route.params?.initialLng;

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
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"IP: " + result.ip}</Text>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"Country: " + result.country_name}</Text>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"State prov: " + result.state_prov}</Text>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"City: " + result.city}</Text>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"Latitude: " + result.latitude}</Text>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"Longitude: " + result.longitude}</Text>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"Time zone: " + result.time_zone.current_time}</Text>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"IPS: " + result.isp}</Text>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>{"Currency: " + result.currency.code}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'PTSerif-BoldItalic', fontSize: 18 }}>Country flag: </Text>
          <Image source={{ uri: result.country_flag }} style={{ width: 30, height: 20 }} />
          </View>
          <View style={styles.container}>
          <Button  title="Показати на карті" onPress={onMap} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default IPSearchPage;



const styles = StyleSheet.create({
  container: {    
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
 
});