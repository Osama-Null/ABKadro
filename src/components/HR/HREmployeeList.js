import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import employees from "../../data/employees";
import HREmployeeItem from "./HREmployeeItem";
import { getEmployees } from "../../api/employees";
import { useQuery } from "@tanstack/react-query";

const HREmployeeList = ({ search, employees }) => {
  // Filter employees based on search input using FirstName and LastName
  const filteredEmployees =
    employees
      ?.filter((employee) => {
        const fullName = `${employee.FirstName} ${
          employee.LastName || ""
        }`.toLowerCase();
        return fullName.includes(search.toLowerCase());
      })
      .map((employee) => (
        <HREmployeeItem key={employee.Id} employee={employee} />
      )) || [];

  return (
    <View style={styles.container}>
      {filteredEmployees.length > 0 ? (
        <ScrollView>{filteredEmployees}</ScrollView>
      ) : (
        <Text style={styles.noEmployees}>No employees found.</Text>
      )}
    </View>
  );
};

// const EmployeesAPI = data
//   ?.filter((employee) => {
//     return employee.name.toLowerCase().includes(search.toLowerCase());
//   })
//   .map((employee) => {
//     return <HREmployeeItem key={employee.id} employee={employee} />;
//   });

// if (EmployeesAPI == null) {
//   console.log("All Fetched Employees 👨‍💼", data);
// } else console.log("❌☹️ No Employees ☹️❌\n", isError);
// //==========================================================
// // Filter employees based on search input
// const filteredEmployees = employees.filter((emp) =>
//   emp.name.toLowerCase().includes(search.toLowerCase())
// );
// //==========================================================
// // Map filtered employees to HREmployeeItem components
// const Employees = filteredEmployees.map((employee) => (
//   <HREmployeeItem key={employee.id} employee={employee} />
// ));

// Filter employees based on search input using FirstName and LastName
//   const filteredEmployees =
//     data
//       ?.filter((employee) => {
//         const fullName = `${employee.FirstName} ${
//           employee.LastName || ""
//         }`.toLowerCase();
//         return fullName.includes(search.toLowerCase());
//       })
//       .map((employee) => (
//         <HREmployeeItem key={employee.Id} employee={employee} />
//       )) || [];

//   // Handle loading and error states
//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loading}>Loading employees...</Text>
//       </View>
//     );
//   }
//   if (isError) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>
//           Error loading employees. Please try again.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* <Text style={{ color: "white" }}>{Employees[0].name}</Text>
//       <ScrollView>{Employees}</ScrollView> */}

//       {filteredEmployees.length > 0 ? (
//         <ScrollView>{filteredEmployees}</ScrollView>
//       ) : (
//         <Text style={styles.noEmployees}>No employees found.</Text>
//       )}
//     </View>
//   );
// };

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
