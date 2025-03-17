import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HREmployeeItem = ({ employee }) => {
  const navigation = useNavigation();
  // Fallback image URI if ProfilePicture is null
  const imageUri = employee.ProfilePicture
    ? employee.ProfilePicture
    : "https://via.placeholder.com/50";

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HREmployeeDetails", {
          employeeId: employee.Id, // Pass Id for fetching details
          employeeName: `${employee.FirstName} ${employee.LastName || ""}`, // Pass full name
        })
      }
      style={styles.card}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {employee.FirstName} {employee.LastName || ""}
        </Text>
        <Text style={styles.details}>
          {employee.Department || "N/A"} - {employee.Position || "N/A"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1E2A44",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    color: "white",
    fontSize: 14,
  },
});

export default HREmployeeItem;
