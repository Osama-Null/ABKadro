import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import employees from "../../data/employees";
import HREmployeeItem from "./HREmployeeItem";

const HREmployeeList = ({ search }) => {
  // Filter employees based on search input
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  // Map filtered employees to HREmployeeItem components
  const Employees = filteredEmployees.map((employee) => (
    <HREmployeeItem key={employee.id} employee={employee} />
  ));

  return (
    <View style={styles.container}>
      <ScrollView>{Employees}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
  },
});

export default HREmployeeList;