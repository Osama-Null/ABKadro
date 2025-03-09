import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const Tab = createBottomTabNavigator();
const MainNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Auth">
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          // tabBarIcon: ({ color }) => (),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Auth"
        component={AuthNavigation}
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
        options={{
          // tabBarIcon: ({ color }) => (),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
