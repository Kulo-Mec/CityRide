import React from 'react';
import { StatusBar, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Intro = () => {
  const navigation = useNavigation();

  const handleDriverPress = () => {
    navigation.navigate('DriverScreen');
  };

  const handlePassengerPress = () => {
    navigation.navigate('PassengerHomePage');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.innerContainer}>
        <Text style={styles.pageTitle}>Welcome to Your Taxi App</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDriverPress}>
            <Text style={styles.buttonText}>I'm a Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlePassengerPress}>
            <Text style={styles.buttonText}>I'm a Passenger</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F2937',
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 100,
  },
  button: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 13,
    marginBottom: 50,
    width: '120%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Intro;
