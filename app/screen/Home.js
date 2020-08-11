import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// API fetch
import { weather } from "../api/index";

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
        <StatusBar style="auto" />
        <Text> ¡ WETHAREA ! </Text>
        <Text> {JSON.stringify(current)} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});