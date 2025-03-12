import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { UserContext } from "../../context/UserContext";
import Login from "../../screens/Shared/Login";
import EmployeeNavigation from "../Employee/EmployeeNavigation";
import HRNavigation from "../HR/HRNavigation";

const Stack = createStackNavigator();

const RootNavigator = () => {
  // const { isAuth, user } = useContext(UserContext);
  // const isHR = user?.department === "Human Resources";

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* {!isAuth ? (
        <Stack.Screen name="Login" component={Login} />
      ) : isHR ? (
        <Stack.Screen name="HRNavigation" component={HRNavigation} />
      ) : (
        <Stack.Screen
          name="EmployeeNavigation"
          component={EmployeeNavigation}
        />
      )} */}
      {/* ============================================= Starting ============================================= */}
      <Stack.Screen name="EmployeeNavigation" component={EmployeeNavigation} />
      {/* <Stack.Screen name="HRNavigation" component={HRNavigation} /> */}
    </Stack.Navigator>
  );
};

export default RootNavigator;
