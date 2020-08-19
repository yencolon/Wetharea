import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Expo imports
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Options = ({ navigation }) => {
  const addNewLocation = () => {
    navigation.push("SearchLocation");
  };

  const manageLocations = () => {
    navigation.push("ManageLocations");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={manageLocations}>
        <Entypo name="menu" size={26} color="whitesmoke" />
      </TouchableOpacity>
      <TouchableOpacity onPress={addNewLocation}>
        <AntDesign name="search1" size={26} color="whitesmoke" />
      </TouchableOpacity>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.22)",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 15,
  },
});