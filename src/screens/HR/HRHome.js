import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext } from "react";
import employees from "../../data/employees";
import requests from "../../data/requests";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { PieChart } from "react-native-gifted-charts";
import HRRequestList from "../../components/HR/HRRequestList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { RequestsContext } from "../../context/RequestsContext";

const HRHome = () => {
  const navigation = useNavigation();
  const { requests } = useContext(RequestsContext);
  // Mapping
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

  const Requests = requests.map((request) => ({
    reqId: request.id,
    reqEmployeeId: request.employeeId,
    reqHrReviewerId: request.hrReviewerId,
    reqType: request.type,
    reqStatus: request.status,
    reqSubmittedDate: request.submittedDate,
    reqReviewedDate: request.reviewedDate,
    reqDetails: request.details,
    reqComments: request.comments,
  }));
  console.log(Employees); // For debugging

  // Calculate totals
  const totalPending = Requests.filter(
    (req) => req.reqStatus === "Pending"
  ).length;

  const totalLeave = Requests.filter((req) => req.reqType === "Leave").length;

  const totalComplaints = Requests.filter(
    (req) => req.reqType === "Complaint"
  ).length;

  const totalRejected = Requests.filter(
    (req) => req.reqStatus === "Rejected"
  ).length;

  const totalAccepted = Requests.filter(
    (req) => req.reqStatus === "Approved"
  ).length;

  const data = [
    { value: totalAccepted, text: "Approved", color: "#03fcc6" }, // Blue
    { value: totalRejected, text: "Rejected", color: "#FC036F" }, // Red
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
              }}
            >
              Welcome, {Employees[0].empName}
            </Text>
            <Text style={styles.header}>Dashboard</Text>
          </View>
          {/* img */}
          <TouchableOpacity
            style={{
              backgroundColor: "gold",
              borderRadius: 100,
              overflow: "hidden",
              width: 50,
              height: 50,
            }}
            onPress={() =>
              navigation.navigate("HRProfileInfo", { employee: Employees[0] })
            }
          >
            <Image
              source={{ uri: Employees[0].empImage }}
              width={50}
              height={50}
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
              <View flex={1} width={"100%"}>
                <View width={"100%"} height={"50%"} justifyContent={"center"}>
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
                  flexDirection={"row"}
                  paddingHorizontal={30}
                  width={"100%"}
                  height={"50%"}
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    width: "100%",
                    height: "50%",
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
                      color="orange"
                    />{" "}
                    {totalLeave}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    <Octicons name="report" size={20} color="orange" />{" "}
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
    paddingTop: "1%",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
