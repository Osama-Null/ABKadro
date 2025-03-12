import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Home = () => {
  // Search, menu
  // Req
  // Others
  return (
    <View style={styles.container}>
      <View flex={1}></View>
      <View flex={1}></View>
      <View flex={1}></View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001D3D",
  },
});
