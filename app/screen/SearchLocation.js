import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import { StackActions } from '@react-navigation/native';

// Expo imports
import { AntDesign } from "@expo/vector-icons";

// API fetch
import { searchLoaction } from "../api/index";
import { weather } from "../api/index";

// LocalStorgae
import { localStorage } from "../storage/localStorage";

// Components
import ActivityIndicatorApp from '../components/ActivityIndicatorApp'
import SearchRow from "../components/SearchRow";

export default function SearchLocation({ navigation }) {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

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

  const setLocation = async (latitude, longitude) => {
    try {
      setIsLoading(true)
      const response = await weather.getWeather(latitude, longitude);
      const { current, hourly, daily } = await response.json();
      localStorage.setForecast({ current, hourly, daily });
      setIsLoading(false)
      navigation.dispatch(StackActions.replace("Home"));
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

  if(isLoading){
    return <ActivityIndicatorApp />
  }

  return (
    <View style={styles.container}>
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
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "whitesmoke",
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
    backgroundColor: "rgba(0,0,0,0.22)",
    height: 0.5,
  },
});