import { StyleSheet, Text, View } from "react-native";
import React from "react";
import employees from "../data/employees";
import requests from "../data/requests";
import { BlurView } from "expo-blur";
import RequestItem from "./RequestItem";

const RequestList = () => {
  const Requests = requests
    .filter((request) => request.status === "Pending")
    .map((request) => {
      const employee = Employees.find(
        (emp) => emp.empId === request.employeeId
      );
      return (
        <RequestItem
          key={request.id}
          reqEmployeeId={request.employeeId}
          reqHrReviewerId={request.hrReviewerId}
          reqType={request.type}
          reqStatus={request.status}
          reqSubmittedDate={request.submittedDate}
          reqReviewedDate={request.reviewedDate}
          reqDetails={request.details}
          reqComments={request.comments}
        />
      );
    });

  const Employees = employees.map((employee) => ({
    empId: employee.id,
    empName: employee.name,
    empImage: employee.image,
    empDepartment: employee.department,
    empPosition: employee.position,
  }));

  return (
    <View flex={1}>
      <Text style={styles.header} marginBottom="5%">
        Requests
      </Text>
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
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
            gap: 10,
          }}
        >
          {/* Req Item */}
        </BlurView>
      </View>
    </View>
  );
};

export default RequestList;

const styles = StyleSheet.create({});
