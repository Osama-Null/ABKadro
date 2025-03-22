import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import employees from "../../data/employees";
import HREmployeeItem from "./HREmployeeItem";
import { getEmployees } from "../../api/employees";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../api/admins";

const HREmployeeList = ({ search }) => {
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

  // Mapping to HREmployeeItem components
  const employees = data?.map((employee) => (
    <HREmployeeItem key={employee.id} employee={employee} />
  ));
  console.log(
    "\n==================================\nFetched All Employees From List: ",
    employees,
    "\n"
  );

  return (
    <View style={styles.container}>
      <ScrollView>{employees}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
  },
  loading: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  noEmployees: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HREmployeeList;
