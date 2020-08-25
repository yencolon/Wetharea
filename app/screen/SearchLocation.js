import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StackActions } from "@react-navigation/native";
import * as Location from "expo-location";

// Expo imports
import { AntDesign } from "@expo/vector-icons";

// API fetch
import { weather, searchLoaction } from "../api/index";

// LocalStorgae
import { localStorage } from "../storage/localStorage";

// Components
import ActivityIndicatorApp from "../components/ActivityIndicatorApp";
import SearchRow from "../components/SearchRow";
import { TouchableOpacity } from "react-native-gesture-handler";

const cities = [
  { name: "Mi Localización", isLocation: true },
  {
    name: "Nueva York",
    isLocation: false,
    location: { lat: 40.712776, lon: -74.005974 },
  },
  {
    name: "París",
    isLocation: false,
    location: { lat: 48.856613, lon: 2.352222 },
  },
  {
    name: "Tokio",
    isLocation: false,
    location: { lat: 35.689487, lon: 139.691711 },
  },
  {
    name: "Singapur",
    isLocation: false,
    location: { lat: 1.29027, lon: 103.851959 },
  },
  {
    name: "Londres",
    isLocation: false,
    location: { lat: 51.50853, lon: -0.12574 },
  },
  {
    name: "Caracas",
    isLocation: false,
    location: { lat: 10.48801, lon: -66.87919 },
  },
  {
    name: "Hong Kong",
    isLocation: false,
    location: { lat: 22.27832, lon: 114.17469 },
  },
];

function DefaultCities({ cities, onAskLocation, onSetLocation }) {
  return (
    <View style={styles.citiesContainer}>
      {cities.map((city) => {
        return (
          <TouchableOpacity
            onPress={() =>
              city.isLocation
                ? onAskLocation()
                : onSetLocation(city.location.lat, city.location.lon)
            }
            style={styles.boundBox}
            key={city.name}
          >
            <Text style={styles.cityName}>{city.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function SearchLocation({ navigation }) {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchApi = async () => {
      try {
        const placesApi = await searchLoaction.getPlaces(search);
        const filterPlaces = await placesApi.json();
        setPlaces(filterPlaces.filter((pl) => pl.address.state !== undefined));
      } catch (error) {
        console.log(error + " error al tratar de buscar lugares");
      }
    };
    searchApi();
  }, [search]);

  const getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("El permiso para accesar a la locacion fue denegado");
    }
    const location = await Location.getCurrentPositionAsync({});

    setLocation(location.coords.latitude, location.coords.longitude);
  };

  const setLocation = async (latitude, longitude) => {
    try {
      if (!(await existLocation(latitude, longitude))) {
        setIsLoading(true);

        const response = await weather.getWeather(latitude, longitude);
        const { current, hourly, daily } = await response.json();
        localStorage.setCoordinates(latitude, longitude);
        localStorage.setForecast({ current, hourly, daily });
        addLocation(latitude, longitude);

        setIsLoading(false);
        navigation.dispatch(StackActions.replace("Home"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addLocation = async (latitude, longitude) => {
    const savedLocations = await localStorage.getSavedLocations();
    const address = await (
      await searchLoaction.getReverseLocation(latitude, longitude)
    ).json();
    if (!savedLocations) {
      const newLocation = [
        {
          id: `${latitude}+${longitude}`,
          name: address.display_name,
          latitude,
          longitude,
        },
      ];
      localStorage.setSavedLocations(newLocation);
    } else {
      let newLocation = savedLocations;
      newLocation.push({
        id: `${latitude}+${longitude}`,
        name: address.display_name,
        latitude,
        longitude,
      });
      localStorage.setSavedLocations(newLocation);
    }
  };

  const existLocation = async (latitude, longitude) => {
    try {
      const savedLocations = await localStorage.getSavedLocations();
      if (savedLocations) {
        const exist = savedLocations.find(
          (location) => location.id === `${latitude}+${longitude}`
        );
        if (exist) {
          alert("Esta locacion ya fue agregada");
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <SearchRow
      place={item.display_name}
      address={item.address}
      latitude={item.lat}
      longitude={item.lon}
      onPress={setLocation}
    />
  );

  const Separator = () => <View style={styles.separator} />;

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
      <StatusBar style="light" translucent={true} />
      <View style={styles.input}>
        <AntDesign name="search1" size={20} color="gray" />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => setSearch(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Buscar (Ej. pais, estado, ciudad, calle, codigo postal)"
        />
      </View>
      <DefaultCities
        cities={cities}
        onAskLocation={getLocation}
        onSetLocation={setLocation}
      />
      <FlatList
        data={places}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item.place_id + ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2C33",
  },
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#2A2C33",
  },
  input: {
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  textInputStyle: {
    flex: 1,
    paddingLeft: 5,
    paddingVertical: 1,
  },
  separator: {
    backgroundColor: "rgba(255,255,255,0.22)",
    height: 0.5,
  },
  citiesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-around",
    flexWrap: "wrap",
  },
  boundBox: {
    borderRadius: 30,
    backgroundColor: "rgba(4,4,4, .5)",
    padding: 10,
    margin: 5,
    minWidth: 80,
  },
  cityName: {
    color: "whitesmoke",
    fontSize: 10,
    textAlign: "center",
  },
});