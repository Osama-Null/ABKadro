import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import employees from "../../data/employees";
import HREmployeeItem from "./HREmployeeItem";
import { getAllEmployees } from "../../api/admins";
import { useQuery } from "@tanstack/react-query";

const HREmployeeList = ({ search }) => {
  // API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchAllEmployees"],
    queryFn: () => getAllEmployees(),
  });
  if (data == null) {
    console.log("All Fetch 👇 ", data);
  } else console.log("☹️☹️☹️☹️☹️☹️☹️ No Data ☹️☹️☹️☹️☹️☹️☹️", isError);

  const EmployeesAPI = data
    ?.filter((employee) => {
      return employee.name.toLowerCase().includes(search.toLowerCase());
    })
    .map((employee) => {
      return <HREmployeeItem key={employee.id} employee={employee} />;
    });

  if (EmployeesAPI == null) {
    console.log("All Fetched Employees 👨‍💼", data);
  } else console.log("❌☹️ No Employees ☹️❌\n", isError);
  //==========================================================
  // Filter employees based on search input
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );
  //==========================================================
  // Map filtered employees to HREmployeeItem components
  const Employees = filteredEmployees.map((employee) => (
    <HREmployeeItem key={employee.id} employee={employee} />
  ));

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>{Employees[0].name}</Text>
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
