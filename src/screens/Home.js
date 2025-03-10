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
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = () => {
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
          {/* <Text>{Employees[0].empName}</Text> */}

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
          >
            <Image
              source={{ uri: Employees[0].empImage }}
              style={styles.container}
              width={50}
              height={50}
            />
          </TouchableOpacity>
        </View>
        {/*Search, menu*/}
        <View flex={1}></View> {/*Req*/}
        <View flex={1}></View> {/*Others*/}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001D3D",
    paddingTop: 30,
  },
});

export default Home;