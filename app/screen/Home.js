import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// API fetch
import { weather } from "../api/index";

// Components
import HourlyCard from '../components/HourlyCard'

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
        <HourlyCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c54",
    alignItems: "center",
    justifyContent: "center",
  },
});