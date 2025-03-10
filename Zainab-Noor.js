import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";

const WelcomePage = ({ navigation }) => {
  const handleLogin = () => {
    alert("Redirecting to login...");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Darbni.jpg")} style={styles.logo} />
      <Animatable.Text
        animation="fadeInDown"
        duration={1500}
        style={styles.appName}
      > 
        Welcome 🚀
      </Animatable.Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#8EACCD",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#DEE5D4",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
