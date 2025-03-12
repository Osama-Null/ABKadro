import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AllReqHistoryItem = ({ request }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ReqHistoryDetails", { request })}
      style={styles.card}
    >
      <View style={styles.info}>
        <Text style={styles.name}>{request.employeeName}</Text>
        <Text style={styles.details}>
          {request.type} - {request.status}
        </Text>
        <Text style={styles.date}>Submitted: {request.submittedDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E2A44",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
  date: {
    color: "white",
    fontSize: 12,
  },
});

export default AllReqHistoryItem;
