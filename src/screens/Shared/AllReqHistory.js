import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AllReqHistoryList from "../../components/Shared/AllReqHistoryList";
import employees from "../../data/employees"; // Import employees data

const AllReqHistory = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // "All", "Approved", "Rejected"

  // Map requests to include employeeName
  const requestsWithEmployeeName = requests.map((req) => {
    const employee = employees.find((emp) => emp.id === req.employeeId);
    return {
      ...req,
      employeeName: employee ? employee.name : "Unknown",
    };
  });

  // Filter requests to show only "Approved" or "Rejected"
  const filteredRequests = requestsWithEmployeeName
    .filter((req) => req.status === "Approved" || req.status === "Rejected")
    .filter(
      (req) =>
        (filterStatus === "All" || req.status === filterStatus) &&
        (req.type.toLowerCase().includes(search.toLowerCase()) ||
          req.employeeName.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate)); // Newest first

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Request History</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by type or employee..."
        placeholderTextColor="#A9A9A9"
        value={search}
        onChangeText={setSearch}
      />

      {/* Filter Buttons */}
      <View style={styles.filterSection}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === "All" && styles.selected,
          ]}
          onPress={() => setFilterStatus("All")}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === "Approved" && styles.selected,
          ]}
          onPress={() => setFilterStatus("Approved")}
        >
          <Text style={styles.filterText}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === "Rejected" && styles.selected,
          ]}
          onPress={() => setFilterStatus("Rejected")}
        >
          <Text style={styles.filterText}>Rejected</Text>
        </TouchableOpacity>
      </View>

      {/* Request History List */}
      <AllReqHistoryList requests={filteredRequests} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
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
  filterSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: "#FFC300",
    padding: 10,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: "#FF5733",
  },
  filterText: {
    color: "#001D3D",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllReqHistory;
