import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  typeOfRequestMap,
  typeOfVacationMap,
  complaintTypeMap,
  vacationStatusMap,
  complaintStatusMap,
} from "../../constants/enums";

const AllReqHistoryItem = ({ request }) => {
  const navigation = useNavigation();

  // Map request details
  const requestType = typeOfRequestMap[request.typeOfRequest] || "Unknown";
  const subType =
    request.typeOfRequest === 0
      ? typeOfVacationMap[request.typeOfVacation] || "Unknown"
      : complaintTypeMap[request.typeOfComplaint] || "Unknown";
  const status =
    request.typeOfRequest === 0
      ? vacationStatusMap[request.requestStatus]
      : complaintStatusMap[request.requestStatus];
  const createdAtDate = new Date(request.createdAt).toLocaleDateString();

  // Determine status icon
  let statusIcon;
  if (request.typeOfRequest === 0) {
    if (request.requestStatus === 2) {
      // Vacation Approved
      statusIcon = <MaterialIcons name="check" size={24} color="green" />;
    } else if (request.requestStatus === 3) {
      // Vacation Rejected
      statusIcon = <MaterialIcons name="close" size={24} color="red" />;
    }
  } else if (request.typeOfRequest === 1 && request.requestStatus === 2) {
    // Complaint Resolved
    statusIcon = <MaterialIcons name="check" size={24} color="green" />;
  }

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={
        () => navigation.navigate("ReqHistoryDetails", { request }) // Adjust navigation target as needed
      }
    >
      {/* Type & Info */}
      <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
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
        <View>
          <Text style={styles.titleText}>
            {requestType} - {subType}
          </Text>
          <Text style={styles.statusText}>Status: {status}</Text>
        </View>
      </View>

      {/* Date & Icon */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{createdAtDate}</Text>
        {statusIcon}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#001D3D",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 10,
  },
  iconContainer: {
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    color: "white",
    fontSize: 14,
  },
  dateContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 5,
  },
  dateText: {
    color: "white",
    fontSize: 14,
  },
});

export default AllReqHistoryItem;
