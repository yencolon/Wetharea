import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// API fetch
import { weather } from "../api/index";
import CurrentWeatherCard from "../components/CurrentWheterCard";

export default class Home extends Component {
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
    const { current } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <CurrentWeatherCard weather='Sunny' temp='28' date={new Date()} place='Puerto La Cruz' feelsLike={29} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    justifyContent: 'space-around'
  },
});