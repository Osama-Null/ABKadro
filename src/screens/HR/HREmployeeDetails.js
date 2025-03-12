import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const HREmployeeDetails = ({ route }) => {
  const { employee } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: employee.image }} style={styles.image} />
      <Text style={styles.name}>{employee.name}</Text>
      <Text style={styles.details}>Department: {employee.department}</Text>
      <Text style={styles.details}>Position: {employee.position}</Text>
      <Text style={styles.details}>Email: {employee.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  details: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
  },
});

export default HREmployeeDetails;