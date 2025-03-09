import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation/MainNavigation";
import Splash from "./src/screens/Splash";

const queryClient = new QueryClient();
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider style={styles.container} client={queryClient}>
      <NavigationContainer>
        {showSplash ? (
          <Splash onFinish={handleSplashFinish} />
        ) : (
          <MainNavigation />
        )}
        {/* <MainNavigation /> */}
      </NavigationContainer>
      <StatusBar style="inverted" />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#071B3B",
    alignItems: "center",
    justifyContent: "center",
  },
});
