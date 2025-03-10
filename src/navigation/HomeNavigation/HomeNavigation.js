import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import Home from '../../screens/Home';
const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigation

const styles = StyleSheet.create({})