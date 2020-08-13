import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import * as Location from "expo-location";

// API fetch
import { weather } from "../api/index";

// Components
import CurrentWeatherCard from "../components/CurrentWheterCard";
import HourlyWeather from "../components/HourlyWeather";
import DailyWeather from "../components/DailyWeather";

// Utils
import { whichBackground } from "../utils/utils";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      current: null,
      hourly: [],
      daily: [],
    };
  }

  componentDidMount = async () => {
    await this.getLocation();
    this.getWeather();
  };

  getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      location,
    });
  };

  getWeather = async () => {
    try {
      const { latitude, longitude } = this.state.location.coords
      const response = await weather.getWeather(latitude, longitude);
      const { current, hourly, daily } = await response.json();
      this.setState({
        current,
        hourly,
        daily,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { current, hourly, daily } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={whichBackground()} style={styles.image}>
          <StatusBar backgroundColor="#20232A" style="light" />
          {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>¡ WETHAREA !</Text>
          </View> */}
          <CurrentWeatherCard current={current} place="Puerto La Cruz" />
          <HourlyWeather hourly={hourly} />
          <DailyWeather daily={daily} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-around",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
  },
});