import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import AllReqHistoryItem from "./AllReqHistoryItem";

const AllReqHistoryList = ({ requests }) => {
  // Map requests to AllReqHistoryItem components
  const ReqHistory = requests.map((request) => (
    <AllReqHistoryItem key={request.id} request={request} />
  ));

  return (
    <View style={styles.container}>
      <ScrollView>{ReqHistory}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
  },
});

export default AllReqHistoryList;
