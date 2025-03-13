import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./src/screens/Splash";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RequestsProvider } from "./src/context/RequestsContext";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import EmployeeNavigation from "./src/navigation/Employee/EmployeeNavigation";
import HRNavigation from "./src/navigation/HR/HRNavigation";
import Login from "./src/screens/Shared/Login";
import employees from "./src/data/employees";

const queryClient = new QueryClient();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RequestsProvider>
        <AuthProvider>
          <NavigationContainer>
            {showSplash ? (
              <Splash onFinish={handleSplashFinish} />
            ) : (
              <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#071B3B" }}>
                  <RoleBasedNavigator />
                </SafeAreaView>
              </SafeAreaProvider>
            )}
            <StatusBar style="inverted" />
          </NavigationContainer>
        </AuthProvider>
      </RequestsProvider>
    </QueryClientProvider>
  );
}

const RoleBasedNavigator = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Login />;
  }

  const user = employees.find((emp) => emp.id === token);
  if (user.role === "admin") {
    return <HRNavigation />;
  } else {
    return <EmployeeNavigation />;
  }
};