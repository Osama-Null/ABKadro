import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import HomeEmp from "../../screens/HomeEmp";
// import Home from "../../screens/Home";
// import RequestDetails from "../../screens/RequestDetails";
// import ProfileInfo from "../../screens/ProfileInfo";
import FileViewer from "../../../screens/FileViewer";
// Screens
import EmployeeHome from "../../../screens/Employee/EmployeeHome";
import EmployeeRequestDetails from "../../../screens/Employee/EmployeeRequestDetails";
import EmployeeProfileInfo from "../../../screens/Shared/ProfileInfo";

const Stack = createNativeStackNavigator();

const EmployeeHomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={EmployeeHome}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmployeeRequestDetails"
        component={EmployeeRequestDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmployeeProfileInfo"
        component={EmployeeProfileInfo}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FileViewer"
        component={FileViewer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeHomeNavigation;

const styles = StyleSheet.create({});
