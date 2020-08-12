import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// Utils
import { getHoursToday, kelvinToCelsius } from "../utils/utils";

export default class HourlyCard extends Component {
  render() {
    const { dt, temp, humidity } = this.props.weather;
    return (
      <View style={styles.card}>
        <Text style={[styles.cardText, { fontWeight: "bold" }]}>
          {" "}
          {getHoursToday(dt)}{" "}
        </Text>
        <Text style={[styles.cardText, { fontSize: 30 }]}> ☀ </Text>
        <Text style={[styles.cardText, {fontSize: 15, fontWeight: "100" }]}>🌡{humidity}%</Text>
        <Text style={[styles.cardText, { fontWeight: "700" }]}>
          {kelvinToCelsius(temp)}°{" "}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.22)',
    paddingVertical: 58,
    paddingHorizontal: 40,
    borderRadius: 20,
    // borderBottomWidth: 1,
    // borderRightWidth: 1,
    marginHorizontal: 5,
    borderColor: "#111",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // elevation: 24,
  },
  cardText: {
    color: "#ecf0f1",
    fontSize: 20,
  },
});