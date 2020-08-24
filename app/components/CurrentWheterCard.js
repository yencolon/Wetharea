import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  kelvinToCelsius,
  getDayDateName,
  getWeatherIcon,
} from "../utils/utils";

// Components
import ActivityIndicatorApp from "../components/ActivityIndicatorApp";
import WeatherIcons from "./WeatherIcons";

function Current({
  temp = 284,
  feelsLike = 284,
  date,
  place = "Cargando",
  weatherIcon = "01d",
  weatherName = "Clouds",
}) {
  return (
    <Fragment>
      <Text style={styles.dateStyle}>{getDayDateName(date)}</Text>
      <Text style={[styles.weatherText, { textAlign: "center" }]}>{place}</Text>
      <View style={{ flexDirection: "row" }}>
        <WeatherIcons
          icon1={getWeatherIcon(weatherIcon).icon1}
          icon2={getWeatherIcon(weatherIcon).icon2}
          fontIconSize={65}
          isCurrent={true}
        />
        <View>
          <Text style={styles.tempText}>{kelvinToCelsius(temp)}°</Text>
          <Text style={styles.weatherText}>
            Feels like {kelvinToCelsius(feelsLike)}°
          </Text>
          <Text style={styles.weatherText}>{weatherName}</Text>
        </View>
      </View>
    </Fragment>
  );
}

function CurrentWeatherCard({ current, place, isLoading }) {
  const weatherIcon = current.weather ? current.weather[0].icon : "01d";
  const weatherName = current.weather ? current.weather[0].main : "Clouds";
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicatorApp /> : <View></View>}
      <Current
        temp={current.temp}
        date={new Date(current.dt * 1000)}
        place={place}
        feelsLike={current.feels_like}
        weatherIcon={weatherIcon}
        weatherName={weatherName}
      />
    </View>
  );
}

export default CurrentWeatherCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.22)",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  tempText: {
    fontSize: 60,
    color: "white",
  },
  weatherIcon: {
    fontSize: 60,
  },
  weatherText: {
    color: "#fff",
  },
  dateStyle: {
    fontSize: 15,
    color: "#fff",
  },
});