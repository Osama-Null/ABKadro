// same as mainNav but for hr
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React from "react";
// Icons
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// Stacks
import HRHomeNavigation from "./Nav/HRHomeNavigation";
import HRAllEmployeeNavigation from "./Nav/HRAllEmployeeNavigation";
import HRReqHistoryNavigation from "../Shared/ReqHistoryNavigation";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const HRNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFC300",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#001D3D",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="HRHomeNavigation"
        component={HRHomeNavigation} // Use your separate stack navigator
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen
        name="HRAllEmployeeNavigation"
        component={HRAllEmployeeNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="users" size={24} color={color} />
          ),
          tabBarLabel: "Emplyees",
        }}
      />

      <Tab.Screen
        name="HRReqHistoryNavigation"
        component={HRReqHistoryNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
          tabBarLabel: "History",
        }}
      />
    </Tab.Navigator>
  );
};

export default HRNavigation;

const styles = StyleSheet.create({});
