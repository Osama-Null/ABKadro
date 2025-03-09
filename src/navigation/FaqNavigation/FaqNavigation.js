import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import Faq from '../../screens/Faq';
const Stack = createNativeStackNavigator();
const FaqNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Faq"
        component={Faq}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default FaqNavigation

const styles = StyleSheet.create({})