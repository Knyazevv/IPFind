import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-web';


function Main({ navigation }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handlePress1 = () => {
    navigation.navigate('Home'); 
    setIsMenuVisible(!isMenuVisible);
  };

  const handlePress2 = () => {
    navigation.navigate('Home2'); 
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        <Text style={styles.buttonText}>Вибріть пошук</Text>        
      </TouchableOpacity>

   
      <Modal
        transparent={true}
        animationType="slide"
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
       
            <TouchableOpacity onPress={handlePress1} style={styles.button}>
              <Text style={styles.buttonText}>ipgeolocation.io</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress2} style={styles.button}>
              <Text style={styles.buttonText}>ip-api.com</Text>
            </TouchableOpacity>

           
            <TouchableOpacity onPress={toggleMenu} style={styles.button}>
              <Text style={styles.buttonText}>Закрити меню</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Main;


const styles = StyleSheet.create({
  
    button: {
      marginTop: 10,
      backgroundColor: 'blue',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });