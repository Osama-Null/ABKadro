import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import employees from "../../data/employees";

const EmployeeRequestDetails = ({ route }) => {
  const {
    title,
    type,
    status,
    description,
    isReturned,
    empImage,
    empId,
    name,
    department,
    email,
    phone,
    position,
  } = route.params;
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
  const navigation = useNavigation();

  // Get the current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.container}>
      {/* Header with Employee Image */}
      <View
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
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
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

      <View style={styles.infoRow}>
        <Text style={styles.type}>Type: {type}</Text>
        <Text
          style={[
            styles.status,
            status === "Rejected" ? styles.rejected : styles.accepted,
          ]}
        >
          {status}
        </Text>
      </View>

      {/* Description / Communication */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {description || "No additional details available."}
        </Text>
      </View>

      {/* Add Info Button - Only if Returned */}
      {isReturned && (
        <View style={styles.buttonContainer}>
          <Button
            title="Add Info"
            onPress={() => console.log("Adding info...")}
            color="#FF8C00"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#001D3D" },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  date: { fontSize: 16, color: "#fff", marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  type: { fontSize: 18, color: "#FF6347" },
  status: { fontSize: 18, fontWeight: "bold" },
  accepted: { color: "green" },
  rejected: { color: "red" },
  descriptionContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    minHeight: 100,
  },
  description: { fontSize: 16, color: "#000" },
  buttonContainer: { marginTop: 20, alignSelf: "center" },
});

export default EmployeeRequestDetails;
