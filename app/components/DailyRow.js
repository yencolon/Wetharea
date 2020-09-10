import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Utils
import {
  getDayDateName,
} from "../utils/utils";
import WeatherIcons from "./WeatherIcons";

export default function DailyRow(props) {
  const { dt, temp, weather } = props.weather;
  return (
    <View style={styles.container}>
      <WeatherIcons icon={weather[0].icon} size={30} />
      <View style={styles.description}>
        <View>
          <Text style={styles.text}>
            {getDayDateName(new Date(dt * 1000))} . {weather[0].main}
          </Text>
          <Text
            style={{ color: "#fff", textTransform: "capitalize" }}
          >{weather[0].description}
          </Text>
        </View>
        <Text style={styles.text}>
          {temp.min}°/ {temp.max}°
      </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 0.5,
    paddingVertical: 16,
    // borderRadius: 10,
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  description: {
    flexDirection: 'row',
    width: '85%'
  }
});