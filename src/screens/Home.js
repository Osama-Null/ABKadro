import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View style={styles.container}>
      <View flex={1}></View> // Search, menu
      <View flex={1}></View> // Req
      <View flex={1}></View> // Others
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
