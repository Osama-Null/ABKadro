import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Services from '../../screens/Services';
import SabbaticalRequest from '../../screens/SabbaticalRequest';
import ComplaintRequest from '../../screens/ComplaintRequest';

const Stack = createNativeStackNavigator();

const ServicesNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#001D3D',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Services"
        component={Services}
        options={{ 
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SabbaticalRequest"
        component={SabbaticalRequest}
        options={{
          headerShown: true,
          headerTitle: "Sabbatical Request",
        }}
      />
      <Stack.Screen
        name="ComplaintRequest"
        component={ComplaintRequest}
        options={{
          headerShown: true,
          headerTitle: "Complaint Request",
        }}
      />
    </Stack.Navigator>
  )
}

export default ServicesNavigation

const styles = StyleSheet.create({})