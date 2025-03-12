import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import employees from "../../data/employees";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";

const EmployeeHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showPicker, setShowPicker] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, title: "Annual Leave Request", status: "Pending" },
    { id: 2, title: "Medical Leave Request", status: "Accepted" },
    { id: 3, title: "Complaint Submission", status: "Rejected" },
  ]);

  const navigation = useNavigation();

  const Employees = employees.map((employee) => ({
    empId: employee.id,
    empName: employee.name,
    empImage: employee.image,
    empRating: employee.rating,
    empDepartment: employee.department,
    empHireDate: employee.hireDate,
    empEmail: employee.contactInfo.email,
    empPhone: employee.contactInfo.phone,
    empPosition: employee.position,
    empDescription: employee.description,
    empStatus: employee.status,
    empSkills: employee.skills.map((skill) => ({
      skillId: skill.id,
      skillName: skill.name,
      skillProficiency: skill.proficiency,
      skillYearsExperience: skill.yearsExperience,
    })),
    empHrSpecific: employee.hrSpecific
      ? {
          certifications: employee.hrSpecific.certifications,
          yearsInHR: employee.hrSpecific.yearsInHR,
          specialties: employee.hrSpecific.specialties,
        }
      : null,
  }));

  console.log(Employees); // For debugging

  const filteredRequests = requests
    .filter((req) =>
      req.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((req) => filter === "All" || req.status === filter);

  const sortedRequests = [...filteredRequests].sort((a, b) =>
    a.status === "Pending" ? -1 : 1
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          flex={1}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            padding: 15,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Welcome, {Employees[0].empName}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Dashboard
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "yellow",
              borderRadius: 100,
              overflow: "hidden",
              width: 50,
              height: 50,
            }}
            onPress={() =>
              navigation.navigate("ProfileInfo", { employee: Employees[0] })
            }
          >
            <Image
              source={{ uri: Employees[0].empImage }}
              width={50}
              height={50}
            />
          </TouchableOpacity>
        </View>

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
              <TouchableOpacity
                style={styles.requestCard}
                onPress={() =>
                  navigation.navigate("EmployeeRequestDetails", {
                    ...item,
                    empImage: Employees[0].empImage,
                  })
                }
              >
                <Text style={styles.requestTitle}>{item.title}</Text>
                <Text
                  style={[
                    styles.status,
                    item.status === "Accepted"
                      ? styles.accepted
                      : item.status === "Rejected"
                      ? styles.rejected
                      : styles.pending,
                  ]}
                >
                  {item.status}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Other Sections */}
        <View style={styles.section}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
    padding: 20,
  },
  section: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  filterIcon: {
    padding: 10,
  },
  picker: {
    backgroundColor: "#fff",
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  requestCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accepted: {
    color: "green",
  },
  rejected: {
    color: "red",
  },
  pending: {
    color: "orange",
  },
});

export default EmployeeHome;
