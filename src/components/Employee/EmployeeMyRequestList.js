import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyRequests } from "../../api/employees";
import { BlurView } from "expo-blur";
import EmployeeMyRequestItem from "./EmployeeMyRequestItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LottieView from "lottie-react-native";

const EmployeeMyRequestList = () => {
  // API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchMyRequests"],
    queryFn: () => getMyRequests(),
    refetchOnMount: "always",
  });

  // Filter requests (Modal)
  const [filterType, setFilterType] = useState("all");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Handle loading and error states
  if (isLoading) {
    return <Text style={{ color: "white" }}>Loading...</Text>;
  }
  if (isError) {
    return <Text style={{ color: "white" }}>Error fetching requests</Text>;
  }

  // Debugging logs
  {
    if (data == null || data == undefined)
      console.log(
        "\n︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵",
        "\n🔴 From API ❌",
        data,
        "\n︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶\n"
      );
    console.log(
      "\n︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵",
      "\n🟢 From API ✔️ ",
      data,
      "\n︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶\n"
    );
  }

  // Filter requests based on the specified conditions
  const filteredRequests = data?.filter((request) => {
    // Define status condition based on request type
    const statusCondition =
      request.typeOfRequest === 0
        ? [0, 1].includes(request.requestStatus) // Ongoing or RequestingDocuments for Leave
        : request.typeOfRequest === 1
        ? [0, 1].includes(request.requestStatus) // Ongoing or ReturnedForResponse for Complaint
        : false;

    // Apply filter
    if (filterType === "all") {
      return statusCondition;
    } else if (filterType === "leave") {
      return request.typeOfRequest === 0 && statusCondition;
    } else if (filterType === "complaint") {
      return request.typeOfRequest === 1 && statusCondition;
    }
    return false;
  });

  // If filter is empty
  const noRequestsMessage =
    filterType === "leave"
      ? "No pending leave requests"
      : filterType === "complaint"
      ? "No pending complaint requests"
      : "No pending requests";

  // Handle case where no requests match the filter
  if (!filteredRequests || filteredRequests.length === 0) {
    return (
      <View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Pending
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {filterType !== "all" && (
              <TouchableOpacity onPress={() => setFilterType("all")}>
                <MaterialIcons name="clear" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View flex={1}>
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
              intensity={50}
              style={{
                flex: 1,
                width: "100%",
                flexDirection: "row",
                padding: 10,
              }}
            >
              {/* Error */}
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 20,
                  marginTop:20
                }}
              >
                <Text style={{ color: "red", fontSize:20, fontWeight:"bold" }}>{noRequestsMessage}</Text>
                <LottieView
                  source={require("../../../assets/Animation_Ghost.json")}
                  autoPlay
                  loop={true}
                  style={{ width: 200, height: 200 }} // Adjust size
                />
              </View>
            </BlurView>
          </View>
        </View>
      </View>
    );
  }

  // Map filtered requests to EmployeeMyRequestItem components
  const MyRequests = filteredRequests.map((request) => {
    return <EmployeeMyRequestItem key={request.requestId} request={request} />;
  });

  return (
    <View>
      {/* Pending Requests */}
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Pending
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {filterType !== "all" && (
            <TouchableOpacity onPress={() => setFilterType("all")}>
              <MaterialIcons name="clear" size={24} color="red" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <FontAwesome name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Requests</Text>

            {/* Filter Options */}
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                setFilterType("leave");
                setFilterModalVisible(false);
              }}
            >
              <Ionicons name="calendar-outline" size={24} color="#4CAF50" />
              <Text style={styles.filterText}>Leave</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                setFilterType("complaint");
                setFilterModalVisible(false);
              }}
            >
              <Ionicons name="alert-circle-outline" size={24} color="#FF3B30" />
              <Text style={styles.filterText}>Complaint</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      {/* List */}
      <View flex={1}>
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
            intensity={50}
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              padding: 10,
            }}
          >
            {/* Item */}
            {MyRequests}
          </BlurView>
        </View>
      </View>
    </View>
  );
};

export default EmployeeMyRequestList;

const styles = StyleSheet.create({
  /* Modal Styling */
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "80%",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  filterText: {
    fontSize: 18,
    marginLeft: 10,
    color: "white",
  },
});
