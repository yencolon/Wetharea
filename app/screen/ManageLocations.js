import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const ManageLocations = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent={true} />
      <Text>Manage Location</Text>
    </View>
  );
};

export default ManageLocations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
});