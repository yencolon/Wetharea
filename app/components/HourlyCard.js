import React, { PureComponent, Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import ActivityIndicatorApp from "../components/ActivityIndicatorApp";
import WeatherIcons from "./WeatherIcons";

// Utils
import { getHoursToday, getWeatherIcon } from "../utils/utils";

export default class HourlyCard extends PureComponent {
  render() {
    const { dt, temp, humidity, weather } = this.props.weather;
    const timezoneOffset = this.props.timezoneOffset;
    const { isLoading } = this.props;
    return (
      <View style={styles.card}>
        <Fragment>
          {isLoading && (
            <View style={styles.loading}>
              <ActivityIndicatorApp />
            </View>
          )}
          <Text style={[styles.cardText, { fontWeight: "bold" }]}>
            {" "}
            {getHoursToday(dt, timezoneOffset)}{" "}
          </Text>
          <WeatherIcons icon={weather[0].icon} size={50} />
          <Text style={[styles.cardText, { fontSize: 15, fontWeight: "100" }]}>
            💧{humidity}%
          </Text>
          <Text
            style={[styles.cardText, { fontWeight: "700", marginLeft: 15 }]}
          >
            {temp}°{" "}
          </Text>
        </Fragment>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    maxWidth: 150,
    minWidth: 120,
    minHeight: 160,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.22)",
    paddingVertical: 35,
    paddingHorizontal: 20,
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});