import React, { useRef, Fragment } from "react";
import { StyleSheet, Animated, Easing } from "react-native";

const ActivityIndicatorApp = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(fadeAnim, {
      toValue: 6,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
      <Animated.Image
        style={[styles.tinyLogo, { transform: [{ rotate: spin }] }]}
        source={require("../assets/img/loader.png")}
      />
  );
};

export default ActivityIndicatorApp;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 22,
    height: 22,
  },
});