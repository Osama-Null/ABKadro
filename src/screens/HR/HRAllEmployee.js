import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import HREmployeeList from "../../components/HR/HREmployeeList";
import { BlurView } from "expo-blur";
import { PieChart } from "react-native-gifted-charts";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../api/admins";

const HRAllEmployee = () => {
  const [search, setSearch] = useState("");

  // Fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchAllEmployees"],
    queryFn: () => getAllEmployees(),
  });

  // Handle loading & error states
  if (isLoading) {
    return <Text style={{}}>Loading...</Text>;
  }
  if (isError) {
    return (
      <Text
        style={{
          color: "red",
          marginTop: 5,
        }}
      >
        Error fetching data
      </Text>
    );
  }

  // Mapping
  const employees = data;
  console.log(
    "\n==================================\nFetched All Employees",
    employees,
    "\n"
  );

  // Calculate employee statistics
  const activeEmployees = employees.filter(
    (emp) => emp.isVacation === false
  ).length;
  const inactiveEmployees = employees.filter(
    (emp) => emp.isVacation === true
  ).length;
  const totalEmployees = employees.length;

  const allZero = activeEmployees === 0 && inactiveEmployees === 0;

  // Data for the pie chart
  const donutData = [
    {
      value: allZero ? 1 : activeEmployees,
      text: "Active",
      color: allZero ? "rgba(255, 255, 255, 0.23)" : "#03fcc6",
    }, // Green for active
    {
      value: allZero ? 1 : inactiveEmployees,
      text: "Inactive",
      color: allZero ? "rgba(255, 255, 255, 0.23)" : "#FC036F",
    }, // Red for inactive
  ];

  return (
    <View style={styles.container}>
      {/* Dashboard */}
      <View margin={-15} marginBottom={10}>
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: "5%",
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        >
          <BlurView
            intensity={50}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 20,
            }}
          >
            <PieChart
              data={donutData}
              radius={90} // Outer radius of the donut
              donut={true} // Enables the donut chart
              innerCircleColor="#384E67"
              innerRadius={65}
            />

            <View
              style={{
                borderRadius: 100,
                width: 80,
                height: 80,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <View marginBottom={10}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Total: {totalEmployees}
                </Text>
              </View>
              <View flexDirection={"row"}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 7,
                    marginRight: 2,
                  }}
                >
                  <FontAwesome name="circle" size={14} color="#03fcc6" />
                  <FontAwesome name="circle" size={14} color="#FC036F" />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                    marginRight: 2,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Active:
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {"  "}Inactive:
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                    marginRight: 2,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {activeEmployees}
                  </Text>
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {inactiveEmployees}
                  </Text>
                </View>
              </View>
            </View>
          </BlurView>
        </View>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search employees..."
        placeholderTextColor="#A9A9A9"
        value={search}
        onChangeText={setSearch}
      />

      {/* Employee List with search prop */}
      <HREmployeeList search={search} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D", // Dark theme background
    padding: 15,
  },
  searchBar: {
    backgroundColor: "#1E2A44",
    borderRadius: 10,
    padding: 10,
    color: "white",
    fontSize: 16,
    marginBottom: 15,
  },
});

export default HRAllEmployee;
