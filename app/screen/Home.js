import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";

// API fetch
import { weather } from "../api/index";
import CurrentWeatherCard from "../components/CurrentWheterCard";

// Components
import WeatherHourly from "../components/WeatherHourly";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      hourly: [],
      daily: [],
    };
  }

  componentDidMount = () => {
    this.getWeather();
  };

  getWeather = async () => {
    try {
      const response = await weather.getWeather(10.21667, -64.61667);
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
    const { current, hourly } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/img/bg.jpg')} style={styles.image}>
          <StatusBar backgroundColor="#20232A" style="light" />
          {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>¡ WETHAREA !</Text>
          </View> */}
          <CurrentWeatherCard current={current} place='Puerto La Cruz' />
          <WeatherHourly hourly={hourly} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'space-around',
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