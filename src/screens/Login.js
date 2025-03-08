// src/screens/Login.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001D3D", // Fallback solid color
  },
  text: {
    color: "#FFFFFF",
    fontSize: 24,
  },
});

export default Login;
