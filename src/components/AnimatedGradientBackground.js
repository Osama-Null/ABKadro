// src/components/AnimatedGradientBackground.js
import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const AnimatedGradientBackground = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000814", "#003566"]} // Simplified gradient
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
  },
});

export default AnimatedGradientBackground;
