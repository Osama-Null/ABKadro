import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Register from "../../screens/Register";
import Login from "../../screens/Shared/Login";

const Stack = createNativeStackNavigator();
const AuthNavigation = ({ setIsAuth, setRole }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      >
        {(props) => (
          <Login {...props} setIsAuth={setIsAuth} setRole={setRole} />
        )}
      </Stack.Screen>
      {/* <Stack.Screen
        name="Register"
        component={Register}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
