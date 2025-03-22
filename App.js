import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./src/screens/Splash";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import EmployeeNavigation from "./src/navigation/Employee/EmployeeNavigation";
import HRNavigation from "./src/navigation/HR/HRNavigation";
import AuthNavigation from "./src/navigation/AuthNavigation/AuthNavigation";
import { getToken, getRole } from "./src/api/storage";
import UserContext from "./src/context/UserContext";

const queryClient = new QueryClient();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const storedRole = await getRole();
        if (token && storedRole) {
          setIsAuth(true);
          setRole(storedRole);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
        setShowSplash(false); // Hide splash after auth check
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <Splash onFinish={() => setLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ isAuth, setIsAuth, role, setRole }}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#001D3D" }}>
              <StatusBar
                style="light"
                hidden={false} // Show or hide the status bar
              />
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
        </UserContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
