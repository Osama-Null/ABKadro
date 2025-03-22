import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext } from "react";
import requests from "../../data/requests";
import { BlurView } from "expo-blur";
import HRRequestItem from "./HRRequestItem";
import { getAllEmployees } from "../../api/admins";
import { useQuery } from "@tanstack/react-query";

const HRRequestList = () => {
  // API
  const employeesQuery = useQuery({
    queryKey: ["fetchAllEmployees"],
    queryFn: () => getAllEmployees(),
  });

  const requestsQuery = useQuery({
    queryKey: ["fetchAllRequests"],
    queryFn: () => getAllRequests(),
  });

  // Handle loading & error states
  if (requestsQuery.isLoading || employeesQuery.isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  if (requestsQuery.isError || employeesQuery.isError) {
    console.log("Error fetching profile: ", profileQuery.error);
    console.log("Error fetching requests: ", requestsQuery.error);
    return <Text style={styles.errorText}>Error fetching data</Text>;
  }

  // For debugging
  console.log(
    "\n==================================\nemployeesQuery.data: ",
    employeesQuery.data,
    "\n"
  );
  console.log(
    "\n==================================\nrequestsQuery.data: ",
    requestsQuery.data,
    "\n"
  );

  // Mapping
  const employees = employeesQuery?.data;
  const requests = requestsQuery?.data
    .filter(
      (request) => request.requestStatus === 0 || request.complaintStatus === 0
    )
    .map((request) => {
      const employee = employees.find(
        (employee) => employee.id === request.employeeId
      );
      return (
        <HRRequestItem
          key={request.requestId}
          request={request}
          employee={employee}
        />
      );
    });

  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.header, { marginBottom: "5%" }]}>Requests</Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignSelf: "center",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: "5%",
        }}
      >
        <BlurView
          intensity="50"
          style={{
            flex: 1,
            width: "100%",
            padding: 15,
          }}
        >
          <ScrollView style={{ flex: 1 }}>{requests}</ScrollView>
        </BlurView>
      </View>
    </View>
  );
};

export default HRRequestList;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
