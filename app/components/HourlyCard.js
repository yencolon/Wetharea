import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class HourlyCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Text style={[styles.cardText, { fontWeight: "bold" }]}> Now </Text>
        <Text style={[styles.cardText, { fontWeight: "700" }]}> 32° </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#379392",
    paddingVertical: 60,
    paddingHorizontal: 45,
    borderRadius: 20,
  },
  cardText: {
    color: "#474787",
    fontSize: 20,
  },
});