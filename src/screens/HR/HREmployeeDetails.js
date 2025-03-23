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
import { getAllRequests, getEmployeeDetails } from "../../api/admins";
import { useQuery } from "@tanstack/react-query";
import { departmentMap, positionMap } from "../../constants/enums";
import HRRequestItem from "../../components/HR/HRRequestItem";
import { BlurView } from "expo-blur";
import EmployeeMyRequestItem from "../../components/Employee/EmployeeMyRequestItem";
import LottieView from "lottie-react-native";

const HREmployeeDetails = ({ route }) => {
  const navigation = useNavigation();
  const { employee } = route.params; // Expecting employeeId from navigation
  console.log("My id: ", employee?.id);

  // API
  const requestsQuery = useQuery({
    queryKey: ["fetchAllRequests"],
    queryFn: () => getAllRequests(),
  });

  // Handle loading & error states
  if (requestsQuery.isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  if (requestsQuery.isError) {
    console.log("Error fetching requests: ", requestsQuery.error);
    return <Text style={styles.errorText}>Error fetching data</Text>;
  }

  const requests = requestsQuery?.data
    .filter((request) => request.employeeId === employee.id)
    .map((req) => <EmployeeMyRequestItem key={req.requestId} request={req} />);

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

        <Image
          source={
            employee.profilePicture
              ? { uri: employee.profilePicture }
              : require("../../../assets/profile.png")
          }
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
          }}
        />
        <Text style={styles.name}>
          {employee.firstName} {employee.lastName}
        </Text>
        <Text style={styles.position}>{positionMap[employee.position]}</Text>
        <Text style={styles.department}>
          {departmentMap[employee.department]}
        </Text>
      </View>

      {/* Contact Information Section */}

      <View
        style={{
          width: "100%",
          alignItems: "center",
          gap: 10,
          marginVertical: 20,
        }}
      >
        <View flexDirection={"row"}>
          <MaterialIcons
            name="email"
            size={20}
            color={"orange"}
            style={styles.icon}
          />
          <Text
            style={{
              color: "white",
              fontSize: 15,
            }}
          >
            {"   "}
            {employee.email}
          </Text>
        </View>
        <View flexDirection={"row"} gap={80}>
          <View flexDirection={"row"}>
            <MaterialIcons name="event-available" size={20} color={"orange"} />
            <Text
              style={{
                color: "white",
                fontSize: 15,
              }}
            >
              {"   "}
              {employee.vacationDays}
            </Text>
          </View>
          <View flexDirection={"row"}>
            <MaterialIcons name="sick" size={20} color={"orange"} />
            <Text
              style={{
                color: "white",
                fontSize: 15,
              }}
            >
              {"   "}
              {employee.sickDays}
            </Text>
          </View>
        </View>
      </View>

      {/* Requests Section */}
      <View
        style={{
          flex: 1,
          width: "100%",
          alignSelf: "center",
          borderRadius: 40,
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
          {requests.length > 0 ? (
            <ScrollView style={{ flex: 1 }}>{requests}</ScrollView>
          ) : (
            <LottieView
              source={require("../../../assets/Animation_Ghost.json")}
              autoPlay
              loop={true}
              style={{ width: 200, height: 200, alignSelf: "center", marginTop: 90 }} // Adjust size
            />
          )}
        </BlurView>
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
