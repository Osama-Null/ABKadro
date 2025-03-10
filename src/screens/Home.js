import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showPicker, setShowPicker] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, title: "Annual Leave Request", status: "Pending" },
    { id: 2, title: "Medical Leave Request", status: "Accepted" },
    { id: 3, title: "Complaint Submission", status: "Rejected" },
  ]);

  const filteredRequests = requests
    .filter((req) => req.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((req) => filter === "All" || req.status === filter);

  const sortedRequests = [...filteredRequests].sort((a, b) => (a.status === "Pending" ? -1 : 1));

  return (
    <View style={styles.container}>
      {/* Search Bar & Menu */}
      <View style={styles.section}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
            <FontAwesome5 name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {showPicker && (
          <Picker
            selectedValue={filter}
            onValueChange={(itemValue) => {
              setFilter(itemValue);
              setShowPicker(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Accepted" value="Accepted" />
            <Picker.Item label="Rejected" value="Rejected" />
          </Picker>
        )}
      </View>
      
      {/* Ongoing Requests */}
      <View style={styles.section}>
        <Text style={styles.header}>Recent Requests</Text>
        <FlatList
          data={sortedRequests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <Text style={styles.requestTitle}>{item.title}</Text>
              <Text style={[styles.status, item.status === "Accepted" ? styles.accepted : item.status === "Rejected" ? styles.rejected : styles.pending]}>
                {item.status}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Other Sections */}
      <View style={styles.section}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001D3D", padding: 20 },
  section: { flex: 1 },
  searchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  searchInput: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 10, marginRight: 10, backgroundColor: "#fff" },
  filterIcon: { padding: 10 },
  picker: { backgroundColor: "#fff", marginTop: 10 },
  header: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  requestCard: { flexDirection: "row", justifyContent: "space-between", padding: 15, borderWidth: 1, borderRadius: 10, marginBottom: 10, backgroundColor: "#fff" },
  requestTitle: { fontSize: 16, fontWeight: "bold" },
  status: { fontSize: 16, fontWeight: "bold" },
  accepted: { color: "green" },
  rejected: { color: "red" },
  pending: { color: "orange" }
});

export default Home;