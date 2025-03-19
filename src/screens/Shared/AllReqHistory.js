import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AllReqHistoryList from "../../components/Shared/AllReqHistoryList";

const AllReqHistory = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>History</Text>

      {/* Request History List */}
      <AllReqHistoryList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
    padding: 15,
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 20,
    alignSelf:"center"
  },
});

export default AllReqHistory;
