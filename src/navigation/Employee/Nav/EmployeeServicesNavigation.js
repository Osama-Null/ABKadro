import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Services from "../../../screens/Employee/Services";

const Stack = createNativeStackNavigator();

const EmployeeServicesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Services"
        component={Services}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeServicesNavigation;

const styles = StyleSheet.create({});
