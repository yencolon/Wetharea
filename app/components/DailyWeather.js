import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import DailyRow from "./DailyRow";
import ActivityIndicatorApp from "../components/ActivityIndicatorApp";

const Separator = () => <View style={styles.separator} />;
export default class DailyWeather extends Component {
  renderItem = ({ item }) => <DailyRow weather={item} />;

  render() {
    const { daily, isLoading } = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicatorApp />
          </View>
        ) : (
          <View></View>
        )}
        <FlatList
          nestedScrollEnabled={true}
          data={daily}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.dt + ""}
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
  loading: {
    alignItems: "center",
  },
  separator: {
    backgroundColor: "rgba(0,0,0,0.22)",
    height: 0.5,
  },
  list: {
    maxHeight: 300,
    minHeight: 300,
  },
});