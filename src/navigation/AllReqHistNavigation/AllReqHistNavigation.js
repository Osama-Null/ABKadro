import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import AllReqHistory from '../../screens/AllReqHistory';
const Stack = createNativeStackNavigator();
const AllReqHistNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllReqHistory"
        component={AllReqHistory}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AllReqHistNavigation

const styles = StyleSheet.create({})