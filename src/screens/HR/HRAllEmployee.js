import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import HREmployeeList from "../../components/HR/HREmployeeList";

const HRAllEmployee = () => {
  // State to manage the search input
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>All Employees</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search employees..."
        placeholderTextColor="#A9A9A9"
        value={search}
        onChangeText={setSearch}
      />

      {/* Employee List with search prop */}
      <HREmployeeList search={search} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D", // Dark theme background
    padding: 15,
  },
  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#1E2A44",
    borderRadius: 10,
    padding: 10,
    color: "white",
    fontSize: 16,
    marginBottom: 15,
  },
});

export default HRAllEmployee;