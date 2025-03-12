import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HREmployeeItem = ({ employee }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("HREmployeeDetails", { employee })}
      style={styles.card}
    >
      <Image source={{ uri: employee.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.details}>
          {employee.department} - {employee.position}
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






