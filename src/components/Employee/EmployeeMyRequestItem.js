import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

// Define enum mappings
const requestTypeMap = {
  0: "Vacation Request",
  1: "Complaint",
  // Add your backend mappings here
};

const vacationTypeMap = {
  0: "Annual Leave",
  1: "Sick Leave",
  2: "Other",
  // Add your backend mappings here
};

const EmployeeMyRequestItem = ({ request }) => {
  // Map integers to strings
  const requestType = requestTypeMap[request.typeOfRequest] || "Unknown";
  const vacationType =
    request.typeOfVacation !== undefined
      ? vacationTypeMap[request.typeOfVacation] || "Unknown"
      : "N/A";

  // Optional: Format dates if your data includes them
  const createdAtDate = new Date(request.createdAt).toLocaleDateString();
  const sDate = new Date(request.startDate).toLocaleDateString();
  const eDate = new Date(request.endDate).toLocaleDateString();
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        gap: 10,
        borderBottomWidth: 2,
        borderColor: "#001D3D",
        marginBottom: 10,
      }}
      onPress={() => navigation.navigate("EmployeeRequestDetails", { request })}
    >
      {/* Type & Info*/}
      <View flexDirection={"row"} gap={10}>
        {/* Type */}
        <View justifyContent={"center"}>
          <Ionicons name="calendar-outline" size={30} color="red" />
        </View>
        {/* Info */}
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {requestType} - {vacationType}
          </Text>
          <View flexDirection={"row"}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
              }}
            >
              {sDate}
            </Text>

            <View
              style={{
                transform: [{ rotate: "90deg" }],
                width: 25,
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                bottom: 4,
              }}
            >
              <Entypo
                name="flow-line"
                size={24}
                color="white"
                alignSelf="center"
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 14,
              }}
            >
              {eDate}
            </Text>
          </View>
        </View>
      </View>

      {/* At */}
      <View
        style={{
          width: 150,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
          }}
        >
          {createdAtDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EmployeeMyRequestItem;

const styles = StyleSheet.create({});
