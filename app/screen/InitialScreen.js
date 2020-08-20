import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackActions } from "@react-navigation/native";

// Components
import ActivityIndicatorApp from "../components/ActivityIndicatorApp";

// LocalStorgae
import { localStorage } from "../storage/localStorage";

const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    const getCurrentWeather = async () => {
      const currentWeather = await localStorage.getForecast();
      if (!currentWeather) {
        navigation.dispatch(StackActions.replace("SearchLocation"));
      } else {
        navigation.dispatch(StackActions.replace("Home"));
      }
    };

    getCurrentWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: "whitesmoke" }}>¡ W E T H A R E A !</Text>
      <ActivityIndicatorApp />
      <Text style={{ fontSize: 15, color: "whitesmoke" }}>Cargando ..</Text>
    </View>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2C33",
  },
});