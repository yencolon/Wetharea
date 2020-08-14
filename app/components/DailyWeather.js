import React, { Component } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";

import DailyRow from "./DailyRow";

const Separator = () => <View style={styles.separator} />;
export default class DailyWeather extends Component {
  renderItem = ({ item }) => <DailyRow weather={item} />;

  render() {
    const { daily , isLoading} = this.props
    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator /> : <View></View>}
        <FlatList
          data={daily}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.dt + ''}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  list: {
    maxHeight: 300,
    minHeight: 300
  }
});