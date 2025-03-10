import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from "@expo/vector-icons/AntDesign";
import FaqNavigation from "../FaqNavigation/FaqNavigation";
import AllReqHistNavigation from "../AllReqHistNavigation/AllReqHistNavigation";
import ServicesNavigation from "../ServicesNavigation/ServicesNavigation";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const MainNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      headerShadowVisible: false,
      tabBarActiveTintColor: "#FFC300",
      tabBarInactiveTintColor: "#003566",
      tabBarStyle: {
        gap: 200,
      }
    }}
  >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="ServicesNavigation"
        component={ServicesNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-repair-service" size={size} color={color} />
          ),
          tabBarLabel: "Service",
        }}
      />
      <Tab.Screen
        name="AuthNav"
        component={AuthNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />

<Tab.Screen
        name="AllReqHistNavigation"
        component={AllReqHistNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
          tabBarLabel: "All-Requests",
        }}
      />

<Tab.Screen
        name="FaqNavigation"
        component={FaqNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="frequently-asked-questions" size={size} color={color} />
          ),
          tabBarLabel: "FAQ",
        }}
      />


    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
