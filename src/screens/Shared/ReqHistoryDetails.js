import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ReqHistoryDetails = ({ route }) => {
  const { request } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Request Details</Text>
      <Text style={styles.details}>Employee: {request.employeeName}</Text>
      <Text style={styles.details}>Type: {request.type}</Text>
      <Text style={styles.details}>Status: {request.status}</Text>
      <Text style={styles.details}>Submitted: {request.submittedDate}</Text>
      <Text style={styles.details}>Details: {request.details}</Text>
      <Text style={styles.details}>Comments: {request.comments || "None"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  details: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ReqHistoryDetails;