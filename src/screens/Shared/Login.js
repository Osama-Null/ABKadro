// src/screens/Login.js
import React, { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";

const Login = ({ setIsAuth, setRole }) => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState([]);
  const { mutate, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      setIsAuth(true);
      setRole(data.role);
      alert("Welcome");
    },
    onError: (error) => {
      setError("Something went wrong");
      alert(isError);
      console.log(isError, error);
    },
  });

  const handleLogin = () => {
    if (!userInfo.email || !userInfo.password) {
      alert("Please enter email and password");
      return;
    }
    setError(null);
    mutate();
  };

  // const [isChecked, setChecked] = useState(false);

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
              onChangeText={(value) => {
                setUserInfo({ ...userInfo, email: value });
                setError(null);
              }}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={"grey"}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                color: "white",
              }}
              secureTextEntry
              onChangeText={(value) => {
                setUserInfo({ ...userInfo, password: value });
                setError(null);
              }}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
          {/* <View
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
          </View> */}
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
              onPress={() => alert("Instagram login not implemented")}
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
              onPress={() => alert("X login not implemented")}
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
              onPress={() => alert("Telegram login not implemented")}
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
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default Login;
