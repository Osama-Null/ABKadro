import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getMyRequests } from "../../api/employees";
import AllReqHistoryItem from "./AllReqHistoryItem";
import { BlurView } from "expo-blur";

const AllReqHistoryList = () => {
  // Fetch all requests
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchAllRequests"],
    queryFn: () => getMyRequests(),
  });

  // Handle loading and error states
  if (isLoading) {
    return <Text style={styles.statusText}>Loading...</Text>;
  }
  if (isError) {
    return <Text style={styles.statusText}>Error fetching requests</Text>;
  }

  // Filter for completed requests
  const historyRequests = data?.filter((request) => {
    if (request.typeOfRequest === 0) {
      // Vacation: Approved (2) or Rejected (3)
      return request.requestStatus === 2 || request.requestStatus === 3;
    } else if (request.typeOfRequest === 1) {
      // Complaint: Resolved (2)
      return request.requestStatus === 2;
    }
    return false;
  });

  // Sort by date, most recent first
  const sortedRequests = historyRequests?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Handle no requests
  if (!sortedRequests || sortedRequests.length === 0) {
    return <Text style={styles.statusText}>No history requests found</Text>;
  }

  // Render the list
  const requestItems = sortedRequests.map((request) => (
    <AllReqHistoryItem key={request.requestId} request={request} />
  ));

  return (
    <View style={styles.listContainer}>
      <BlurView intensity={50} style={styles.blurContainer}>
        {requestItems}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: "5%",
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  statusText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default AllReqHistoryList;
