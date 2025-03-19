import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  typeOfRequestMap,
  typeOfVacationMap,
  complaintTypeMap,
} from "../../constants/enums";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const EmployeeMyRequestItem = ({ request }) => {
  const navigation = useNavigation();
  // Map request type from enum.js
  const requestType = typeOfRequestMap[request.typeOfRequest] || "Unknown";
  const subType =
    request.typeOfRequest === 0
      ? typeOfVacationMap[request.typeOfVacation] || "Unknown"
      : complaintTypeMap[request.typeOfComplaint] || "Unknown";

  // Dates format
  const createdAtDate = new Date(request.createdAt).toLocaleDateString();
  const sDate = request.startDate
    ? new Date(request.startDate).toLocaleDateString()
    : "N/A";
  const eDate = request.endDate
    ? new Date(request.endDate).toLocaleDateString()
    : "N/A";
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
          {request.typeOfRequest === 0 ? (
            <Ionicons name="calendar-outline" size={30} color="#4CAF50" />
          ) : (
            <MaterialCommunityIcons
              name="note-alert"
              size={30}
              color="#FF3B30"
            />
          )}
        </View>
        {/* Info */}
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {requestType} - {subType}
          </Text>
          {request.typeOfRequest === 0 && (
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                }}
              >
                {sDate}
                {/* only of it's a vacation */}
              </Text>

              <View
                style={{
                  transform: [{ rotate: "90deg" }],
                  width: 25,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo
                  name="flow-line"
                  size={24}
                  color="#4CAF50"
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
                {/* only of it's a vacation */}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* At */}
      <View
        style={{
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
