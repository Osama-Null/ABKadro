// same as mainNav but for employee
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import EmployeeHomeNavigation from "./Nav/EmployeeHomeNavigation"; // Import the external stack
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EmployeeReqHistoryNavigation from "../Shared/ReqHistoryNavigation";
import EmployeeServicesNavigation from "./Nav/EmployeeServicesNavigation";
import EmployeeFaqNavigation from "./Nav/EmployeeFaqNavigation";

const Tab = createBottomTabNavigator();

const EmployeeNavigation = () => {
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
        name="Home"
        component={EmployeeHomeNavigation} // Use your separate stack navigator
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />

      <Tab.Screen
        name="EmployeeServicesNavigation"
        component={EmployeeServicesNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-repair-service" size={24} color={color} />
          ),
          tabBarLabel: "Services",
        }}
      />

      <Tab.Screen
        name="EmployeeReqHistoryNavigation"
        component={EmployeeReqHistoryNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
          tabBarLabel: "History",
        }}
      />

      <Tab.Screen
        name="EmployeeFaqNavigation"
        component={EmployeeFaqNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="frequently-asked-questions"
              size={24}
              color={color}
            />
          ),
          tabBarLabel: "FAQ",
        }}
      />
    </Tab.Navigator>
  );
};

export default EmployeeNavigation;
