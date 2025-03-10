import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation/MainNavigation";
import Splash from "./src/screens/Splash";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#071B3B" }}>
              <MainNavigation />
            </SafeAreaView>
          </SafeAreaProvider>
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
