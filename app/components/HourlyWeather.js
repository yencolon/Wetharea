import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";

// Components
import HourlyCard from "./HourlyCard";

// Utils
import { filterHoursActualDay } from "../utils/utils";

export default class HourlyWeather extends Component {
  renderItem = ({ item }) => (
    <HourlyCard weather={item} isLoading={this.props.isLoading} timezoneOffset={this.props.timezoneOffset}/>
  );

  render() {
    const { hourly } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filterHoursActualDay(hourly)}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.dt + ""}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
});