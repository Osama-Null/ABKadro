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

  // Handle loading & error states
  if (profileQuery.isLoading || requestsQuery.isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  if (profileQuery.isError || requestsQuery.isError) {
    console.log("Error fetching profile: ", profileQuery.error);
    console.log("Error fetching requests: ", requestsQuery.error);
    return <Text style={styles.errorText}>Error fetching data</Text>;
  }

  // Mapping
  const myProfile = profileQuery.data;
  const position = positionMap[myProfile.position] || "Unknown";
  const requests = requestsQuery?.data;
  console.log("status: ", requests.length, requests[0].typeOfRequest, requests[1].typeOfRequest);

  // For debugging
  console.log(
    "\n==================================\nMpProfile: ",
    myProfile,
    "\n"
  );
  console.log(
    "\n==================================\nrequestsQuery: ",
    requestsQuery,
    "\n"
  );
  console.log(
    "\n==================================\nrequestsQuery.data: ",
    requestsQuery.data,
    "\n"
  );
  console.log(
    "\n==================================\nPosition: ",
    position,
    "\n"
  );

  // Calculate totals
  const totalPending = requests.filter(
    (req) => req.requestStatus === 0 || req.complaintStatus === 0
  ).length;

  const totalLeave = requests.filter((req) => req.typeOfRequest === 0).length;

  const totalComplaints = requests.filter(
    (req) => req.typeOfRequest === 1
  ).length;

  const totalAccepted = requests.filter(
    (req) => req.requestStatus === 2
  ).length;

  const totalRejected = requests.filter(
    (req) => req.requestStatus === 3
  ).length;

  const totalResolved = requests.filter(
    (req) => req.complaintStatus === 2
  ).length;

  const allZero =
    totalAccepted === 0 && totalRejected === 0 && totalResolved === 0;

  const data = [
    {
      value: allZero ? 1 : totalAccepted,
      text: "Approved",
      color: allZero ? "rgba(255, 255, 255, 0.23)" : "#03fcc6",
    },
    {
      value: allZero ? 1 : totalRejected,
      text: "Rejected",
      color: allZero ? "rgba(255, 255, 255, 0.23)" : "#FC036F",
    },
    {
      value: allZero ? 1 : totalResolved,
      text: "Resolved",
      color: allZero ? "rgba(255, 255, 255, 0.23)" : "#2196F3",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View
          flex={1}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "5%",
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
                fontSize: 15,
              }}
            >
              Welcome, {myProfile.firstName} {myProfile.lastName}
            </Text>
            <Text style={styles.header}>Dashboard</Text>
          </View>
          {/* img */}
          <TouchableOpacity
            onPress={() => navigation.navigate("HRProfileInfo", myProfile)}
          >
            <Image
              source={
                myProfile.profilePicture
                  ? { uri: myProfile.profilePicture }
                  : require("../../../assets/profile.png")
              }
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
        {/* Dashboard */}
        <View flex={1}>
          <View
            style={{
              flex: 1,
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
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  paddingRight: 30,
                  gap: 20,
                }}
              >
                <View
                  style={{
                    width: "100%",
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
                    Total Requests: {totalPending}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 30,
                    width: "100%",
                    justifyContent: "center",
                    gap: 50,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    <FontAwesome5
                      name="umbrella-beach"
                      size={20}
                      color={"orange"}
                    />

                    {totalLeave}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    <Octicons
                      name="report"
                      size={20}
                      color={"orange"}
                    />{" "}
                    {totalComplaints}
                  </Text>
                </View>
              </View>
              <View
                flex={1}
                style={{
                  alignItems: "center",
                  borderLeftWidth: 1,
                  borderLeftColor: "white",
                  paddingLeft: 20,
                }}
              >
                <PieChart
                  data={data}
                  radius={60} // Outer radius of the donut
                  donut={true} // Enables the donut chart
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
                          gap: 6,
                          marginRight: 2,
                        }}
                      >
                        <FontAwesome name="circle" size={9} color="#03fcc6" />
                        <FontAwesome name="circle" size={9} color="#FC036F" />
                        <FontAwesome name="circle" size={9} color="#2196F3" />
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
                        <Text
                          style={{
                            color: "white",
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        >
                          Resolved:
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
                        <Text
                          style={{
                            color: "white",
                            fontSize: 11,
                            fontWeight: "bold",
                          }}
                        >
                          {totalResolved}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            </BlurView>
          </View>
        </View>
        {/* Req */}
        <HRRequestList />
      </ScrollView>
    </View>
  );
};

export default HRHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001D3D",
    paddingTop: "2%",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
});
