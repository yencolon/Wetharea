import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Utils
import { getDayDateName } from "../utils/utils";

// Components
import WeatherIcons from "./WeatherIcons";

export default function DailyRow(props) {
  const { dt, temp, weather } = props.weather;
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <WeatherIcons icon={weather[0].icon} size={30} />
            <Text style={[styles.text, { marginLeft: 5 }]}>
              {getDayDateName(new Date(dt * 1000))} . {weather[0].main}
            </Text>
          </View>
          <Text style={styles.text}>
            {temp.min}°/ {temp.max}°
          </Text>
        </View>
      </View>
      <Text style={{ color: "#fff", textTransform: "capitalize" }}>
        {weather[0].description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderRadius: 10,
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    flexDirection: "row",
  },
});