import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Utils
import {
  getWeatherIcon,
  getDayDateName,
  kelvinToCelsius,
} from "../utils/utils";

export default function DailyRow(props) {
  const { dt, temp, weather } = props.weather;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          {getWeatherIcon(weather[0].main)}{" "}
          {getDayDateName(new Date(dt * 1000))} . {weather[0].main}
        </Text>
        <Text
          style={{ color: "#fff", marginLeft: 5, textTransform: "capitalize" }}
        >
          {weather[0].description}
        </Text>
      </View>
      <Text style={styles.text}>
        {kelvinToCelsius(temp.min)}°/ {kelvinToCelsius(temp.max)}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 0.5,
    paddingVertical: 16,
    paddingHorizontal: 8,
    // borderRadius: 10,
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});