import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { StyleSheet, ImageBackground, View, ScrollView } from "react-native";

// Expo imports
import Constants from "expo-constants";
import * as Location from "expo-location";

// API fetch
import { weather } from "../api/index";

// Components
import CurrentWeatherCard from "../components/CurrentWheterCard";
import HourlyWeather from "../components/HourlyWeather";
import DailyWeather from "../components/DailyWeather";

// AsyncStorage
import { localStorage } from "../storage/localStorage";

// Utils
import { whichBackground } from "../utils/utils";
import WeatherDetails from "../components/WeatherDetails";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      address: "Cargando",
      current: {},
      hourly: Array.from({ length: 9 }, () => ({
        dt: Math.floor(Math.random() * 1000),
      })),
      daily: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    await this.getWeatherLocalStorage();
    await this.getAddresLocalStorage();
    await this.getLocation();
    this.getWeather();
  };

  getAddresLocalStorage = async () => {
    const address = await localStorage.getAddress();
    if (address) {
      this.setState({
        address: address.city + ', ' + address.region + ' ' + address.country,
        isLoading: false,
      });
    }
  };

  getWeatherLocalStorage = async () => {
    const weather = await localStorage.getForecast();
    if (weather) {
      const { current, hourly, daily } = weather;
      this.setState({
        current,
        hourly,
        daily,
        isLoading: false,
      });
    }
  };

  getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("El permiso para accesar a la locacion fue denegado");
    }

    const location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({latitude: location.coords.latitude, longitude: location.coords.longitude});
    
    this.setState({
      location,
      address: address[0].city + ', ' + address[0].region + ' ' + address[0].country
    });
    localStorage.setAddress(address[0]);
  };

  getWeather = async () => {
    try {
      const { latitude, longitude } = this.state.location.coords;
      const response = await weather.getWeather(latitude, longitude);
      const { current, hourly, daily } = await response.json();
      this.setState({
        current,
        hourly,
        daily,
        isLoading: false,
      });
      localStorage.setForecast({ current, hourly, daily });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { current, hourly, daily, address, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar style="light" translucent={true} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground source={whichBackground()} style={styles.image}>
            <CurrentWeatherCard
              current={current}
              place={address}
              isLoading={isLoading}
            />
            <HourlyWeather hourly={hourly} isLoading={isLoading} />
            <View>
              <DailyWeather daily={daily} isLoading={isLoading} />
            </View>
            <WeatherDetails
              wind_speed={current.wind_speed}
              sunriseTime={current.sunrise}
              sunsetTime={current.sunset}
              pressure={current.pressure}
              uvi={current.uvi}
              humidity={current.humidity}
              isLoading={isLoading}
            />
          </ImageBackground>
        </ScrollView>
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
    paddingTop: Constants.statusBarHeight,
    resizeMode: "cover",
    flexDirection: "column",
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