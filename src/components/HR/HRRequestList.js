import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext } from "react";
import employees from "../../data/employees";
import requests from "../../data/requests";
import { BlurView } from "expo-blur";
import HRRequestItem from "./HRRequestItem";
import { RequestsContext } from "../../context/RequestsContext";

const HRRequestList = () => {
  const { requests } = useContext(RequestsContext);

  const Employees = employees.map((employee) => ({
    empId: employee.id,
    empName: employee.name,
    empImage: employee.image,
    empDepartment: employee.department,
    empPosition: employee.position,
  }));

  const Requests = requests
    .filter((request) => request.status === "Pending")
    .sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate))
    .map((request) => {
      const employee = Employees.find(
        (emp) => emp.empId === request.employeeId
      );
      return (
        <HRRequestItem
          key={request.id}
          reqId={request.id}
          reqEmployeeId={request.employeeId}
          reqHrReviewerId={request.hrReviewerId}
          reqType={request.type}
          reqStatus={request.status}
          reqSubmittedDate={request.submittedDate}
          reqReviewedDate={request.reviewedDate}
          reqDetails={request.details}
          reqComments={request.comments}
          //-------------------------------------------
          empName={employee ? employee.empName : "Unknown"}
          empImage={employee ? employee.empImage : "default_image_url"}
          empDepartment={employee ? employee.empDepartment : "N/A"}
          empPosition={employee ? employee.empPosition : "N/A"}
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
          <ScrollView style={{ flex: 1 }}>{Requests}</ScrollView>
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
