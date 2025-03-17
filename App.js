import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./src/screens/Splash";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EmployeeNavigation from "./src/navigation/Employee/EmployeeNavigation";
import HRNavigation from "./src/navigation/HR/HRNavigation";
import UserContext from "./src/context/UserContext";
import AuthNavigation from "./src/navigation/AuthNavigation/AuthNavigation";
import EmployeeHome from "./src/screens/Employee/EmployeeHome";

const queryClient = new QueryClient();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = () => {
    setShowSplash(false);
  };
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      const storedRole = await getRole();
      if (token && storedRole) {
        setIsAuth(true);
        setRole(storedRole);
      }
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ isAuth, setIsAuth }}>
          {showSplash ? (
            <Splash onFinish={handleSplashFinish} />
          ) : (
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1, backgroundColor: "#071B3B" }}>
                {isAuth ? (
                  role === "Admin" ? (
                    <HRNavigation />
                  ) : (
                    <EmployeeNavigation />
                  )
                ) : (
                  <AuthNavigation setIsAuth={setIsAuth} setRole={setRole} />
                )}
              </SafeAreaView>
            </SafeAreaProvider>
          )}
          <StatusBar style="inverted" />
        </UserContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
