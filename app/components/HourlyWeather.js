import React, { Component } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";

import HourlyCard from "./HourlyCard";

import { filterHoursActualDay } from "../utils/utils";

export default class HourlyWeather extends Component {
  renderItem = ({ item }) => <HourlyCard weather={item} />;

  render() {
    const { hourly } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          horizontal
          data={filterHoursActualDay(hourly)}
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