import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";

// Expo imports
import Constants from "expo-constants";

// API fetch
import { weather, searchLoaction } from "../api/index";

// Components
import Options from "../components/Options";
import CurrentWeatherCard from "../components/CurrentWheterCard";
import HourlyWeather from "../components/HourlyWeather";
import DailyWeather from "../components/DailyWeather";

// LocalStorage
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
      timezoneOffset: 0,
      hourly: Array.from({ length: 9 }, () => ({
        dt: Math.floor(Math.random() * 1000),
      })),
      daily: [],
      isLoading: true,
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    await this.getCoordinatesStorage();
    await this.getWeatherLocalStorage();
    await this.getAddresLocalStorage();
    this.getWeather();
  };

  getCoordinatesStorage = async () => {
    const coordinates = await localStorage.getCoordinates();
    if (coordinates) {
      this.setState({
        location: {
          coords: {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        },
      });
    }
  };

  getAddresLocalStorage = async () => {
    const address = await localStorage.getAddress();
    if (address) {
      this.setState({
        address: address,
      });
    }
  };

  getWeatherLocalStorage = async () => {
    const weather = await localStorage.getForecast();
    if (weather) {
      const { current, hourly, daily, timezoneOffset } = weather;
      this.setState({
        current,
        hourly,
        daily,
        timezoneOffset
      });
    }
  };

  getWeather = async () => {
    try {
      const { latitude, longitude } = this.state.location.coords;
      const response = await weather.getWeather(latitude, longitude);
      const { current, hourly, daily , timezone_offset} = await response.json();
      const address = await (
        await searchLoaction.getReverseLocation(latitude, longitude)
      ).json();

      this.setState({
        current,
        hourly,
        daily,
        timezoneOffset: timezone_offset,
        address: address.display_name,
        isLoading: false,
      });

      localStorage.setAddress(address.display_name);
      localStorage.setForecast({ current, hourly, daily, timezoneOffset: timezone_offset });

    } catch (error) {
      console.log(JSON.stringify(error.message));
      this.setState({
        isLoading: false,
      });
      alert("Error a actualizar clima");
    }
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
      isLoading: true,
    });
    this.getWeather();
    this.setState({
      refreshing: false,
      isLoading: true,
    });
  };

  render() {
    const {
      timezoneOffset,
      current,
      hourly,
      daily,
      address,
      isLoading,
      refreshing,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar style="light" translucent={true} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <ImageBackground source={whichBackground()} style={styles.image}>
            <Options navigation={this.props.navigation} />
            <CurrentWeatherCard
              current={current}
              place={address}
              isLoading={isLoading}
            />
            <HourlyWeather hourly={hourly} timezoneOffset={timezoneOffset} isLoading={isLoading} />
            <View>
              <DailyWeather daily={daily} isLoading={isLoading} />
            </View>
            <WeatherDetails
              timezoneOffset={timezoneOffset} 
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