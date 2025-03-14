// src/screens/Login.js
import React, { useState, useContext } from "react";
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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = () => {
    const role = login(email, password);
    if (role) {
      // Navigation happens automatically via RoleBasedNavigator
      setError(""); // Clear any previous error
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
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
          <FontAwesome5 name="user-alt" size={80} color="gold" />
          <Image />
        </BlurView>
      </View>

      <View
        style={{
          flex: 3,
          width: "100%",
          padding: 20,
        }}
      >
        <View style={{ gap: 30, marginTop: 50 }}>
          <View style={{ gap: 20 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                color: "white",
              }}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                color: "white",
              }}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {error ? <Text style={styles.errorText} color={"white"}>{error}</Text> : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "gold" : undefined}
              />
              <Text
                style={{
                  color: "white",
                }}
              >
                Remember me
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  color: "gold",
                  fontWeight: "bold",
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(128, 128, 128, 0.6)",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              width: "100%",
              height: "15%",
            }}
            onPress={handleLogin}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.6)",
                width: 40,
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="instagram" size={24} color="gold" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.6)",
                width: 40,
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome6 name="square-x-twitter" size={24} color="gold" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.6)",
                width: 40,
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EvilIcons
                name="sc-telegram"
                size={30}
                color="gold"
                marginBottom={8}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

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

export default Login;
