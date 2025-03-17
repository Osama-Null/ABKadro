import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyRequests } from "../../api/employees";
import { BlurView } from "expo-blur";
import EmployeeMyRequestItem from "./EmployeeMyRequestItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";


const EmployeeMyRequestList = () => {
  // API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchMyRequests"],
    queryFn: () => getMyRequests(),
  });
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
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const MyRequests = data?.map((request) => {
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
        {filterModalVisible ? (
          <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
            <MaterialIcons name="clear" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <FontAwesome name="filter" size={24} color="white" />
          </TouchableOpacity>
        )}
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
                setFilterModalVisible(false);
                // Add filtering logic for Leave
              }}
            >
              <Ionicons name="calendar-outline" size={24} color="red" />
              <Text style={styles.filterText}>Leave</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                setFilterModalVisible(false);
                // Add filtering logic for Complaints
              }}
            >
              <Ionicons name="alert-circle-outline" size={24} color="red" />
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
