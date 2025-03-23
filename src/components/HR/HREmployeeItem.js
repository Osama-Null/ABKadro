import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { departmentMap, positionMap } from "../../constants/enums";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const HREmployeeItem = ({ employee }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("HREmployeeDetails", {employee})}
      style={styles.card}
    >
      <View flexDirection={"row"}>
        <Image
          source={
            employee.profilePicture
              ? { uri: employee.profilePicture }
              : require("../../../assets/profile.png")
          }
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>
            {employee.firstName} {employee.lastName}
          </Text>
          <Text style={styles.details}>
            {departmentMap[employee?.department]} -{" "}
            {positionMap[employee?.position]}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingRight: 10,
        }}
      >
        <FontAwesome
          name="circle"
          size={14}
          color={employee.isVacation? "#FC036F" : "#03fcc6"}
        />
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
    justifyContent: "space-between",
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
