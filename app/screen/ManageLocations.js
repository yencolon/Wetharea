import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// Expo imports
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// LocalStorgae
import { localStorage } from "../storage/localStorage";

// Utils
import { kelvinToCelsius, getWeatherIcon } from "../utils/utils";

const locations = [
  {
    id: "0",
    name: "Tokio",
    latituded: 0,
    longitude: 0,
  },
  {
    id: "1",
    name: "Berlin",
    latituded: 1,
    longitude: 1,
  },
  {
    id: "2",
    name: "Marruecos",
    latituded: 2,
    longitude: 2,
  },
  {
    id: "3",
    name: "Manaos",
    latituded: 3,
    longitude: 3,
  },
  {
    id: "4",
    name: "Roma",
    latituded: 4,
    longitude: 4,
  },
  {
    id: "5",
    name: "Paris",
    latituded: 5,
    longitude: 5,
  },
];

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

const ManageLocations = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const getLocations = async () => {
      try {
        const currentAddress = await localStorage.getAddress();
        if (currentAddress) {
          setCurrentLocation(currentAddress);
        }
        const weather = await localStorage.getForecast();
        if (weather) {
          const { current } = weather;
          setTemperature(current.temp);
          setIcon(current.weather[0].main);
        }
      } catch (error) {}
    };
    getLocations();
  }, []);

  const onSelect = (item) => {
    console.log(item.latituded, item.longitude);
  };

  const onDelete = (index) => {
    console.log(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={"#111"} />
      <View style={styles.currentLocation}>
        <View style={{ flexDirection: "row" }}>
          <SimpleLineIcons name="location-pin" size={24} color="whitesmoke" />
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
            return (
              <LocationCard
                onSelect={() => onSelect(location)}
                onDelete={() => onDelete(index)}
                location={location}
                key={location.id}
              />
            );
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 25,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.22)",
  },
  textLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textLocation: {
    marginLeft: 5,
    color: "whitesmoke",
    fontSize: 15,
  },
});