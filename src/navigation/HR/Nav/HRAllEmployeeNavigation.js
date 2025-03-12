import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HRAllEmployee from '../../../screens/HR/HRAllEmployee';
import HREmployeeDetails from '../../../screens/HR/HREmployeeDetails';

const Stack = createNativeStackNavigator();

const HRAllEmployeeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HRAllEmployee"
        component={HRAllEmployee}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HREmployeeDetails"
        component={HREmployeeDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HRAllEmployeeNavigation

const styles = StyleSheet.create({})