import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Register = () => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        // Background Linear Gradient
        colors={["rgba(121, 95, 252, 0.8)", "transparent"]}
        style={styles.background}
      /> */}

      <View
        style={{
          flex: 1,
          borderRadius: 10,
          width: "100%",
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <BlurView intensity={60} style={styles.blurContainer}>
        <FontAwesome5 name="user-plus" size={80} color="gold" />
        </BlurView>
      </View>

      <View
        style={{
          flex: 3,
          width: "100%",
          padding: 20,
        }}
      >
        <View style={{ gap: 30, marginTop: 10 }}>
          <View style={{ gap: 20 }}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
              }}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
              }}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
              }}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
              }}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
              }}
            />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
              }}
            />
            <TextInput
              placeholder="Civil ID"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(128, 128, 128, 0.6)",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              width: "100%",
              height: 50,
              marginTop: 10
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}
          >
            <Text style={{ color: "white" }}>Already a user? </Text>
            <TouchableOpacity>
              <Text style={{ color: "gold", fontWeight: "bold" }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001D3D",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 150,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
