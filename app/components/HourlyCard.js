import React, { PureComponent, Fragment } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

// Utils
import { getHoursToday, getWeatherIcon, kelvinToCelsius } from "../utils/utils";

export default class HourlyCard extends PureComponent {
  render() {
    const { dt, temp, humidity, weather } = this.props.weather;
    const { isLoading } = this.props;
    return (
      <View style={styles.card}>
        {
          isLoading ? <ActivityIndicator /> :
            <Fragment>
              <Text style={[styles.cardText, { fontWeight: "bold" }]}>
                {" "}
                {getHoursToday(dt)}{" "}
              </Text>
              <Text style={[styles.cardText, { fontSize: 30 }]}>
                {" "}
                {getWeatherIcon(weather[0].main)}{" "}
              </Text>
              <Text style={[styles.cardText, { fontSize: 15, fontWeight: "100" }]}>
                💧{humidity}%
            </Text>
              <Text style={[styles.cardText, { fontWeight: "700", marginLeft: 15 }]}>
                {kelvinToCelsius(temp)}°{" "}
              </Text>
            </Fragment>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.22)",
    paddingVertical: 58,
    paddingHorizontal: 38,
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