import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RequestsContext } from "../../context/RequestsContext";

const HRRequestDetails = ({ route }) => {
  const navigation = useNavigation();
  const { request, employee } = route.params;
  const { updateRequest } = useContext(RequestsContext);

  const [status, setStatus] = useState(request.status);
  const [comments, setComments] = useState(request.comments || "");
  const [action, setAction] = useState(null);

  const handleSave = () => {
    const updatedStatus = action ? action : status;
    const updatedRequest = {
      ...request,
      status: updatedStatus,
      comments: comments,
      reviewedDate: new Date().toISOString().split("T")[0], // Today's date
      hrReviewerId: request.hrReviewerId || "currentHR", // Replace with actual HR ID
    };
    updateRequest(updatedRequest);
    console.log("Updated Request:", updatedRequest); // Debugging
    navigation.goBack();
  };

  return (
    // <View style={styles.container}>
    //   <View
    //     style={{
    //       flex: 1,
    //       backgroundColor: "red",
    //       width: "100%",
    //     }}
    //   >
    //     <Image
    //       source={{ uri: Employees[0].empImage }}
    //       style={{ width: "100%", height: "100%", resizeMode: "cover" }}
    //     />
    //   </View>
    //   <View
    //     style={{
    //       flex: 2,
    //       backgroundColor: "blue",
    //       width: "100%",
    //     }}
    //   >
    //     <Text>hi</Text>
    //   </View>
    // </View>

    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 999,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      {/* Employee Info */}
      <View style={styles.employeeSection}>
        <Image source={{ uri: employee.image }} style={styles.employeeImage} />
        <Text style={styles.employeeName}>{employee.name}</Text>
        <Text style={styles.employeeDetails}>
          {employee.department} - {employee.position}
        </Text>
      </View>

      {/* Request Info */}
      <View style={styles.requestSection}>
        <Text style={styles.requestType}>{request.type}</Text>
        <Text style={styles.requestDate}>
          Submitted: {request.submittedDate}
        </Text>
        <Text style={styles.requestDetails}>{request.details}</Text>
        <Text style={styles.requestStatus}>Status: {status}</Text>
      </View>

      {/* Action Section */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[styles.actionButton, action === "accept" && styles.selected]}
          onPress={() => setAction("accept")}
        >
          <Text style={styles.actionText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, action === "reject" && styles.selected]}
          onPress={() => setAction("reject")}
        >
          <Text style={styles.actionText}>Reject</Text>
        </TouchableOpacity>
      </View>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={comments}
          onChangeText={setComments}
          multiline
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HRRequestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#001D3D",
    padding: 20,
  },
  employeeSection: { alignItems: "center", marginBottom: 20 },
  employeeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  employeeName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  employeeDetails: {
    color: "white",
    fontSize: 16,
  },
  requestSection: {
    marginBottom: 20,
  },
  requestType: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  requestDate: {
    color: "white",
    fontSize: 16,
  },
  requestDetails: {
    color: "white",
    fontSize: 16,
  },
  requestStatus: {
    color: "white",
    fontSize: 16,
  },
  actionSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#FFC300",
    padding: 10,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: "#FF5733",
  },
  actionText: {
    color: "#001D3D",
    fontSize: 16,
    fontWeight: "bold",
  },
  commentSection: {
    marginBottom: 20,
  },
  commentInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    height: 100,
  },
  saveButton: {
    backgroundColor: "#03fcc6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#001D3D",
    fontSize: 18,
    fontWeight: "bold",
  },
});
