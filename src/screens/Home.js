import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import employees from "../data/employees";
import requests from "../data/requests";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from "react-native-gifted-charts";

const Home = () => {
  const data = [
    { value: 40, text: "Pending", color: "#1E90FF" }, // Dodger Blue
    { value: 35, text: "Approved", color: "#FFD700" }, // Gold
    { value: 25, text: "Rejected", color: "#4169E1" }, // Royal Blue
  ];
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
              backgroundColor: "yellow",
              borderRadius: 100,
              overflow: "hidden",
              width: 50,
              height: 50,
            }}
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
              height: 110,
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
                padding: 10,
              }}
            >
              <View flex={1}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  Total Requests
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  Total Requests
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  Total Requests
                </Text>
              </View>
              <View
                flex={1}
                style={{
                  alignItems: "center",
                }}
              >
                <PieChart
                  data={data}
                  radius={40} // Outer radius of the donut
                  donut={true} // Enables the donut chart
                  innerCircleColor="#384E67"
                  innerRadius={25}
                />
              </View>
            </BlurView>
          </View>
        </View>
        {/* Req */}
        <View flex={1}>
          <Text style={styles.header} marginBottom="5%">
            Requests
          </Text>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignSelf: "center",
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: "5%",
            }}
          >
            <BlurView
              intensity="50"
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                gap: 10,
              }}
            >
              {/* 1 */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  gap: 10,
                  backgroundColor: "#001D3D",
                  borderRadius: 5,
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderRadius: "100%",
                      overflow: "hidden",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: Employees[0].empImage }}
                      width={50}
                      height={50}
                    />
                  </View>
                </View>
                <View flex={9}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      weight: "80%",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                      }}
                    >
                      {Employees[0].empName}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 11,
                        fontWeight: "normal",
                        fontFamily: "Roboto",
                      }}
                    >
                      {Requests[0].reqSubmittedDate}
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      fontWeight: "500",
                      fontFamily: "Roboto",
                    }}
                  >
                    {Employees[0].empDepartment} - {Employees[0].empPosition}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    ● {Requests[0].reqType}
                  </Text>
                </View>
              </View>
              {/* 2 */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  gap: 10,
                  backgroundColor: "#001D3D",
                  borderRadius: 5,
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderRadius: "100%",
                      overflow: "hidden",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: Employees[0].empImage }}
                      width={50}
                      height={50}
                    />
                  </View>
                </View>
                <View flex={9}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      weight: "80%",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                      }}
                    >
                      {Employees[0].empName}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 11,
                        fontWeight: "normal",
                        fontFamily: "Roboto",
                      }}
                    >
                      {Requests[0].reqSubmittedDate}
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      fontWeight: "500",
                      fontFamily: "Roboto",
                    }}
                  >
                    {Employees[0].empDepartment} - {Employees[0].empPosition}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    ● {Requests[0].reqType}
                  </Text>
                </View>
              </View>
            </BlurView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001D3D",
    paddingTop: "10%",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
