import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import Services from '../../screens/Services';
const Stack = createNativeStackNavigator();
const ServicesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Services"
        component={Services}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ServicesNavigation

const styles = StyleSheet.create({})