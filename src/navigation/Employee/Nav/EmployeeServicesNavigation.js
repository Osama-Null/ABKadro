import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Services from "../../../screens/Employee/Services";
import SabbaticalRequest from "../../../screens/Employee/SabbaticalRequest";
import ComplaintRequest from "../../../screens/Employee/ComplaintRequest";

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
      <Stack.Screen
        name="SabbaticalRequest"
        component={SabbaticalRequest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComplaintRequest"
        component={ComplaintRequest}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeServicesNavigation;

const styles = StyleSheet.create({});
