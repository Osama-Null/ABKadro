import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployeeFaq from "../../../screens/Employee/EmployeeFaq";

const Stack = createNativeStackNavigator();

const EmployeeFaqNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EmployeeFaq"
        component={EmployeeFaq}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeFaqNavigation;

const styles = StyleSheet.create({});
