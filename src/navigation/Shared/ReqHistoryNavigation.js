import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AllReqHistory from "../../screens/Shared/AllReqHistory";
import ReqHistoryDetails from "../../screens/Shared/ReqHistoryDetails";
const Stack = createNativeStackNavigator();
const ReqHistoryNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllReqHistory"
        component={AllReqHistory}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReqHistoryDetails"
        component={ReqHistoryDetails}
        headerBackButtonMenuEnabled="false"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ReqHistoryNavigation;

const styles = StyleSheet.create({});
