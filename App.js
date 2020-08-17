import React, { useState , useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screen
import Home from "./app/screen/Home";
import SearchLocation from './app/screen/SearchLocation'
import { localStorage } from "./app/storage/localStorage";
import { Header } from "react-native/Libraries/NewAppScreen";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  

  useEffect(() => {
    
    const getCurrentWeather = async() => {
      const currentWeather = (await localStorage.getForecast())
      if(currentWeather) setinitialScreen()
    }

    getCurrentWeather()
    return () => {

    }
  }, [])

  const setLocation = (latitude, longitude) => {
    setLatitude(latitude)
    setLongitude(longitude)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="SearchLocation" component={SearchLocation}  />
          <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}