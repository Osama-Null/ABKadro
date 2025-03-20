import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { PieChart } from "react-native-gifted-charts";
import HRRequestList from "../../components/HR/HRRequestList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../api/shared";
import { getAllRequests } from "../../api/admins";
import {
  positionMap,
  typeOfRequestMap,
  vacationStatusMap,
  complaintStatusMap,
  typeOfVacationMap,
  complaintTypeMap,
} from "../../constants/enums";

const HRHome = () => {
  const navigation = useNavigation();

  // Fetch data
  const profileQuery = useQuery({
    queryKey: ["fetchMyProfile"],
    queryFn: () => getMyProfile(),
  });
  const requestsQuery = useQuery({
    queryKey: ["fetchAllRequests"],
    queryFn: () => getAllRequests(),
  });

  // Handle loading and error states
  if (profileQuery.isLoading || requestsQuery.isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  if (profileQuery.isError || requestsQuery.isError) {
    console.log("Error fetching profile: ", profileQuery.error);
    console.log("Error fetching requests: ", requestsQuery.error);
    return <Text style={styles.errorText}>Error fetching data</Text>;
  }

  // Mapping Profile
  const MyProfile = profileQuery.data;
  const position = positionMap[MyProfile.position] || "Unknown";

  // Mapping Requests
  const Requests = requestsQuery.data.map((request) => {
    const typeOfRequest = typeOfRequestMap[request.typeOfRequest] || "Unknown";
    let status;
    if (request.typeOfRequest === 0) {
      status = vacationStatusMap[request.requestStatus] || "Unknown";
    } else if (request.typeOfRequest === 1) {
      status = complaintStatusMap[request.complaintStatus] || "Unknown";
    }
    const typeOfVacation =
      request.typeOfRequest === 0
        ? typeOfVacationMap[request.typeOfVacation] || "Unknown"
        : null;
    const typeOfComplaint =
      request.typeOfRequest === 1
        ? complaintTypeMap[request.typeOfComplaint] || "Unknown"
        : null;

    return {
      reqId: request.requestId,
      reqEmployeeId: request.employeeId,
      reqType: typeOfRequest,
      reqStatus: status,
      reqSubmittedDate: request.createdAt,
      reqDetails: request.messages,
      reqTypeOfVacation: typeOfVacation,
      reqTypeOfComplaint: typeOfComplaint,
    };
  });

  // Calculate totals
  const totalPending = Requests.filter(
    (req) =>
      req.reqStatus === "Ongoing" ||
      req.reqStatus === "RequestingDocuments" ||
      req.reqStatus === "ReturedForResponse"
  ).length;

  const totalLeave = Requests.filter(
    (req) => req.reqType === "Vacation"
  ).length;

  const totalComplaints = Requests.filter(
    (req) => req.reqType === "Complaint"
  ).length;

  const totalRejected = Requests.filter(
    (req) => req.reqStatus === "Rejected" || req.reqStatus === "Resolved"
  ).length;

  const totalAccepted = Requests.filter(
    (req) => req.reqStatus === "Approved"
  ).length;

  const pieData = [
    { value: totalAccepted, text: "Approved", color: "#03fcc6" },
    { value: totalRejected, text: "Rejected", color: "#FC036F" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "5%",
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text style={{ color: "white" }}>
              Welcome, {MyProfile.firstName} {MyProfile.lastName}
            </Text>
            <Text style={styles.header}>Dashboard</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "gold",
              borderRadius: 100,
              overflow: "hidden",
              width: 50,
              height: 50,
            }}
            onPress={() => navigation.navigate("HRProfileInfo", MyProfile)}
          >
            {MyProfile.profilePicture ? (
              <Image
                source={{ uri: MyProfile.profilePicture }}
                style={{ width: 50, height: 50 }}
              />
            ) : (
              <Text>No Image</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Dashboard */}
        <View>
          <View
            style={{
              width: "100%",
              height: 140,
              alignSelf: "center",
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: "5%",
            }}
          >
            <BlurView
              intensity={50}
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                padding: 20,
              }}
            >
              <View style={{ flex: 1, width: "100%" }}>
                <View
                  style={{
                    width: "100%",
                    height: "50%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      alignSelf: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Total Pending Requests: {totalPending}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    width: "100%",
                    height: "50%",
                    justifyContent: "center",
                    gap: 50,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>
                    <FontAwesome5
                      name="umbrella-beach"
                      size={20}
                      color="orange"
                    />{" "}
                    {totalLeave}
                  </Text>
                  <Text style={{ color: "white", fontSize: 20 }}>
                    <Octicons name="report" size={20} color="orange" />{" "}
                    {totalComplaints}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  borderLeftWidth: 1,
                  borderLeftColor: "white",
                }}
              >
                <PieChart
                  data={pieData}
                  radius={60}
                  donut={true}
                  innerCircleColor="#384E67"
                  innerRadius={45}
                  centerLabelComponent={() => (
                    <View
                      style={{
                        flexDirection: "row",
                        borderRadius: 100,
                        width: 80,
                        height: 80,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 7,
                          marginRight: 2,
                        }}
                      >
                        <FontAwesome name="circle" size={9} color="#03fcc6" />
                        <FontAwesome name="circle" size={9} color="#FC036F" />
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 5,
                          marginRight: 2,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        >
                          Accepted:
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        >
                          Rejected:
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 5,
                          marginRight: 2,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        >
                          {totalAccepted}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        >
                          {totalRejected}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            </BlurView>
          </View>
        </View>

        {/* Requests List */}
        <HRRequestList />
      </ScrollView>
    </View>
  );
};

export default HRHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
    paddingTop: "1%",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
