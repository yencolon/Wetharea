import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StackActions } from "@react-navigation/native";

// Expo imports
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// LocalStorgae
import { localStorage } from "../storage/localStorage";

// Utils
import { kelvinToCelsius, getWeatherIcon } from "../utils/utils";

// API fetch
import { weather } from "../api/index";

// Components
import ActivityIndicatorApp from "../components/ActivityIndicatorApp";

function LocationCard({ onSelect, location, onDelete }) {
  return (
    <View style={styles.locationCard}>
      <TouchableOpacity onPress={onSelect} style={styles.textLocationContainer}>
        <SimpleLineIcons name="location-pin" size={18} color="whitesmoke" />
        <Text style={styles.textLocation}>{location.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <AntDesign name="minuscircle" size={20} color="whitesmoke" />
      </TouchableOpacity>
    </View>
  );
}

const ManageLocations = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [icon, setIcon] = useState("");
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const currentAddress = await localStorage.getAddress();
      if (currentAddress) {
        setCurrentLocation(currentAddress);
      }
      const locations = await localStorage.getSavedLocations();
      if (locations) {
        setLocations(locations);
      }
      const weather = await localStorage.getForecast();
      if (weather) {
        const { current } = weather;
        setTemperature(current.temp);
        setIcon(current.weather[0].main);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = async (item) => {
    try {
      setIsLoading(true);
      const response = await weather.getWeather(item.latitude, item.longitude);
      const { current, hourly, daily } = await response.json();
      localStorage.setCoordinates(item.latitude, item.longitude);
      localStorage.setForecast({ current, hourly, daily });
      setIsLoading(false);
      navigation.dispatch(StackActions.replace("Home"));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onDelete = async (index) => {
    try {
      let savedLocations = await localStorage.getSavedLocations();
      savedLocations.splice(index, 1);
      setLocations(savedLocations);
      await localStorage.setSavedLocations(savedLocations);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <StatusBar style="light" translucent={true} />
        <Text style={{ color: "whitesmoke" }}>¡ W E T H A R E A !</Text>
        <ActivityIndicatorApp />
        <Text style={{ fontSize: 15, color: "whitesmoke" }}>Cargando ..</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={"#111"} />
      <View style={styles.currentLocation}>
        <View style={{ flexDirection: "row" }}>
          <SimpleLineIcons name="location-pin" size={28} color="whitesmoke" />
          <Text style={styles.currentLocationText}>{currentLocation}</Text>
        </View>
        <Text style={{ color: "whitesmoke", fontSize: 28 }}>
          {getWeatherIcon(icon)} {kelvinToCelsius(temperature)}°
        </Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.locationsTitle}>Locaciones Guardadas</Text>
      </View>
      <ScrollView>
        <View style={styles.saveLocations}>
          {locations.map((location, index) => {
            if (location.name !== currentLocation) {
              return (
                <LocationCard
                  onSelect={() => onSelect(location)}
                  onDelete={() => onDelete(index)}
                  location={location}
                  key={location.id}
                />
              );
            }
            return [];
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageLocations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2C33",
    justifyContent: "space-between",
  },
  currentLocation: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.22)",
    borderRadius: 20,
    marginTop: 60,
    marginHorizontal: 20,
    paddingHorizontal: 35,
    paddingVertical: 30,
  },
  currentLocationText: {
    fontSize: 16,
    color: "whitesmoke",
    marginLeft: 5,
  },
  locationsTitle: {
    color: "whitesmoke",
    marginHorizontal: 30,
    marginTop: 15,
    fontSize: 17,
  },
  saveLocations: {
    flex: 2,
    padding: 10,
  },
  locationCard: {
    minHeight: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.22)",
  },
  textLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
  },
  textLocation: {
    marginLeft: 3,
    color: "whitesmoke",
    fontSize: 15,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2C33",
  },
});