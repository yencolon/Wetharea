import React, { Component } from "react";
import { SafeAreaView, FlatList, StyleSheet, View } from "react-native";

import DailyRow from "./DailyRow";

const Separator = () => <View style={styles.separator} />;
export default class DailyWeather extends Component {
  renderItem = ({ item }) => <DailyRow weather={item} />;

  render() {
    const { daily } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={daily}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.dt+''}
          ItemSeparatorComponent={Separator}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "rgba(0,0,0,0.22)",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  separator: {
    backgroundColor: "rgba(0,0,0,0.22)",
    height: .5,
  },
});