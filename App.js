import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screen
import InitialScreen from "./app/screen/InitialScreen";
import SearchLocation from "./app/screen/SearchLocation";
import Home from "./app/screen/Home";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={InitialScreen}>
        <Stack.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchLocation"
          component={SearchLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}