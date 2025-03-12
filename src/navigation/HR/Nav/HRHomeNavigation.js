import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HRHome from '../../../screens/HR/HRHome';
import HRRequestDetails from '../../../screens/HR/HRRequestDetails';
import HRProfileInfo from "../../../screens/Shared/ProfileInfo";

const Stack = createNativeStackNavigator();

const HRHomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HRHome"
        component={HRHome}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HRRequestDetails"
        component={HRRequestDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HRProfileInfo"
        component={HRProfileInfo}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HRHomeNavigation

const styles = StyleSheet.create({})