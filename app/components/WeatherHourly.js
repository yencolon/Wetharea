import React, { Component } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";

import HourlyCard from "./HourlyCard";

export default class WeatherHourly extends Component {
  renderItem = ({ item }) => <HourlyCard weather={item} />;

  render() {
    const { hourly } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          horizontal
          data={hourly}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.dt + ""}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
});