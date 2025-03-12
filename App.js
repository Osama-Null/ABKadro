import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./src/screens/Splash";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { UserProvider, UserContext } from "./context/UserContext";
import { RequestsProvider } from "./src/context/RequestsContext";
import EmployeeNavigation from "./src/navigation/Employee/EmployeeNavigation";
import HRNavigation from "./src/navigation/HR/HRNavigation";
import Login from "./src/screens/Shared/Login";
import { createStackNavigator } from "@react-navigation/stack";

const queryClient = new QueryClient();
const Stack = createStackNavigator();
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RequestsProvider>
        <NavigationContainer>
          {showSplash ? (
            <Splash onFinish={handleSplashFinish} />
          ) : (
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1, backgroundColor: "#071B3B" }}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="HRNavigation" component={HRNavigation} />
                </Stack.Navigator>
              </SafeAreaView>
            </SafeAreaProvider>
          )}
          <StatusBar style="inverted" />
        </NavigationContainer>
      </RequestsProvider>
    </QueryClientProvider>

    //<UserProvider>

    // <RequestsProvider>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <QueryClientProvider client={queryClient}>
    //       <NavigationContainer>
    //         {showSplash ? (
    //           <Splash onFinish={handleSplashFinish} />
    //         ) : (
    //           <SafeAreaProvider>
    //             <SafeAreaView style={{ flex: 1, backgroundColor: "#071B3B" }}>
    //               {/* <RoleBasedNavigator /> */}
    //               <Stack.Screen name="HRNavigation" component={HRNavigation} />
    //             </SafeAreaView>
    //           </SafeAreaProvider>
    //         )}
    //       </NavigationContainer>
    //       <StatusBar style="inverted" />
    //     </QueryClientProvider>
    //   </Stack.Navigator>
    // </RequestsProvider>
    // =====================2=======================
    //</UserProvider>

    // //<UserProvider>
    // <RequestsProvider>
    //   <QueryClientProvider client={queryClient}>
    //     <NavigationContainer>
    //       {showSplash ? (
    //         <Splash onFinish={handleSplashFinish} />
    //       ) : (
    //         <SafeAreaProvider>
    //           <SafeAreaView style={{ flex: 1, backgroundColor: "#071B3B" }}>
    //               {/* ============================================= Starting ============================================= */}
    //               <RootNavigator />{" "}
    //           </SafeAreaView>
    //         </SafeAreaProvider>
    //       )}
    //     </NavigationContainer>
    //     <StatusBar style="inverted" />
    //   </QueryClientProvider>
    // </RequestsProvider>
    // //</UserProvider>
  );
}

// const RoleBasedNavigator = () => {
//   const { isAuth, user } = useContext(UserContext);
//   const isHR = user?.role === "Admin"; // "Admin" is HR per backend data

//   if (!isAuth) {
//     return <Login />;
//   } else if (isHR) {
//     return <HRNavigation />;
//   } else {
//     return <EmployeeNavigation />;
//   }
// };
