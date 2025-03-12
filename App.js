import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./src/screens/Splash";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator/RootNavigator";
// import { UserProvider } from "./context/UserContext";
import { RequestsProvider } from "./src/context/RequestsContext";

const queryClient = new QueryClient();
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    //<UserProvider>
    <RequestsProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {showSplash ? (
            <Splash onFinish={handleSplashFinish} />
          ) : (
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1, backgroundColor: "#071B3B" }}>
                <RootNavigator />{" "}
                {/* ============================================= Starting ============================================= */}
              </SafeAreaView>
            </SafeAreaProvider>
          )}
        </NavigationContainer>
        <StatusBar style="inverted" />
      </QueryClientProvider>
    </RequestsProvider>
    //</UserProvider>
  );
}
