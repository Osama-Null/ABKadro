import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import requests from "../../data/requests"; // Import requests data

const HREmployeeDetails = ({ route }) => {
  const navigation = useNavigation();
  const { employee } = route.params;

  const employeeContact = employee.contactInfo;

  // Filter requests related to this employee
  const employeeRequests = requests.filter(
    (req) => req.employeeId === employee.id
  );

  return (
    <View style={styles.container}>
      {/* Header Section with Employee Details */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <Image source={{ uri: employee.image }} style={styles.profileImage} />
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.position}>{employee.position}</Text>
        <Text style={styles.department}>{employee.department}</Text>
      </View>

      {/* Contact Information Section */}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          gap: 10,
          marginVertical: 20
        }}
      >
        <View flexDirection={"row"}>
          <MaterialIcons
            name="email"
            size={20}
            color={"gold"}
            style={styles.icon}
          />
          <Text
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            {"   "}
            {employeeContact.email}
          </Text>
        </View>
        <View flexDirection={"row"} gap={50}>
          <View flexDirection={"row"}>
          <FontAwesome
            name="phone"
            size={20}
            color={"gold"}
            style={styles.icon}
          />
          <Text
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            {"   "}
            {employeeContact.phone}
          </Text>
        </View>
        <View flexDirection={"row"}>
          <AntDesign name="star" size={20} color={"gold"} style={styles.icon} />
          <Text
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            {"   "}
            {employee.rating}/5
          </Text>
        </View>
        </View>
      </View>

      {/* Requests Section */}
      <View style={styles.requestsContainer}>
        <Text style={styles.requestsTitle}>Employee Requests</Text>
        {employeeRequests.length > 0 ? (
          <ScrollView>
            {employeeRequests.map((req) => (
              <TouchableOpacity
                key={req.id}
                style={styles.requestItem}
                onPress={() =>
                  navigation.navigate("RequestDetails", { request: req })
                }
              >
                <Text style={styles.requestText}>Type: {req.type}</Text>
                <Text style={styles.requestText}>Status: {req.status}</Text>
                <Text style={styles.requestText}>
                  Submitted: {req.submittedDate}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noRequestsText}>No requests found.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
  },
  headerContainer: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: "#0F4277",
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 999,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  position: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  department: {
    color: "white",
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
    alignItems: "center",
  },
  requestsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  requestsTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  requestItem: {
    backgroundColor: "#1E2A44",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  requestText: {
    color: "white",
    fontSize: 14,
  },
  noRequestsText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HREmployeeDetails;
