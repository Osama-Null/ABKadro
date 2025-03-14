import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import employees from "../../data/employees";
import HREmployeeItem from "./HREmployeeItem";
import { getAllEmployees } from "../../api/admins";

const HREmployeeList = ({ search }) => {
  // API
  const [employeesbe, setEmployeesBe] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await getAllEmployees();
      setEmployeesBe(res);
      console.log("Employees: ", res);
    };
    fetchEmployees();
  }, []);

  // const Employees = employeesbe
  //   .filter((employee) => {
  //     return employee.name.toLowerCase().includes(search.toLowerCase());
  //   })
  //   .map((employee) => {
  //     return <HREmployeeItem key={employee.id} employee={employee} />;
  //   });
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
