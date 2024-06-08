import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login'; 
import Intro from './screens/intro';
import Signup from './screens/signup';
import Splash from './screens/splash';
import PassengerHomePage from './screens/PHomeScreen';
import DriverScreen from './screens/Driver';
import BookingScreen from './screens/Booking';
import Menu from './screens/menu';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name="PassengerHomePage" component={PassengerHomePage}/>
        <Stack.Screen name="DriverScreen" component={DriverScreen}/>
        
           <Stack.Screen name="Menu" component={Menu}/>
      
        <Stack.Screen name="BookingScreen" component={BookingScreen}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
