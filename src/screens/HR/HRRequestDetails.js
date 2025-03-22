import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  typeOfRequestMap,
  vacationStatusMap,
  complaintStatusMap,
} from "../../constants/enums.js";
import { respondToRequest } from "../../api/admins.js";
import { useMutation } from "@tanstack/react-query";

const HRRequestDetails = ({ route }) => {
  const { request, employee } = route.params || {};
  console.log("\n\nRequest Details: ", request, "\n\n");

  // State Management
  const [selectedAction, setSelectedAction] = useState(null);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [descriptionBody, setDescriptionBody] = useState("");
  const [files, setFiles] = useState([]);

  // Mutation Setup
  const {
    mutate,
    isLoading,
    isError,
    error: mutationError,
  } = useMutation({
    mutationKey: ["respondToRequest"],
    mutationFn: ({ requestId, status, descriptionBody, files }) =>
      respondToRequest(requestId, status, descriptionBody, files),
    onSuccess: (data) => {
      console.log("Request updated:", data);
      alert("Request updated successfully!");
    },
    onError: (error) => {
      console.error("Error:", error);
      alert("Failed to update request.");
    },
  });

  // If request is undefined, show an error message
  if (!request) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Request data is missing.</Text>
      </View>
    );
  }

  // Action Options Based on Request Type
  const vacationActions = [
    "Approve",
    "Reject",
    "Request Documents",
    "Request More Information",
  ];
  const complaintActions = ["Mark as Resolved", "Return for Response"];
  const actions =
    request.typeOfRequest === 0 ? vacationActions : complaintActions;

  // Helper to Map Actions to API Enum Values
  const mapActionToEnum = (action, requestType) => {
    if (requestType === 0) {
      const vacationEnum = {
        Approve: 2,
        Reject: 3,
        "Request Documents": 1,
      };
      return vacationEnum[action];
    } else {
      const complaintEnum = {
        "Mark as Resolved": 2,
        "Return for Response": 1,
      };
      return complaintEnum[action];
    }
  };

  // Handle Action Selection
  const handleActionSelect = (action) => {
    setSelectedAction(action);
    setShowActionDropdown(false);
  };

  // File Upload Handling
  const handleFileSelect = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setFiles([...files, result]);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!selectedAction) {
      alert("Please select an action.");
      return;
    }

    const status = mapActionToEnum(selectedAction, request.typeOfRequest);

    mutate({
      requestId: request.requestId,
      status,
      descriptionBody,
      files,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Request Details</Text>

      {/* Employee Info */}
      <View style={styles.employeeContainer}>
        <Image
          source={
            employee?.profilePicture
              ? { uri: employee.profilePicture }
              : require("../../../assets/profile.png")
          }
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.employeeName}>
            {employee?.firstName} {employee?.lastName}
          </Text>
        </View>
      </View>

      {/* Request Info */}
      <View style={styles.requestInfo}>
        <Text style={styles.infoText}>
          Type: {typeOfRequestMap[request.typeOfRequest]}
        </Text>
        <Text style={styles.infoText}>
          Status:{" "}
          {request.typeOfRequest === 0
            ? vacationStatusMap[request.requestStatus]
            : complaintStatusMap[request.complaintStatus]}
        </Text>
        {request.typeOfRequest === 0 && (
          <>
            <Text style={styles.infoText}>
              Start Date: {new Date(request.startDate).toLocaleDateString()}
            </Text>
            <Text style={styles.infoText}>
              End Date: {new Date(request.endDate).toLocaleDateString()}
            </Text>
          </>
        )}
        {request.messages && request.messages.length > 0 && (
          <View>
            <Text style={styles.label}>Submitted Files:</Text>
            {request.messages.map((msg, index) =>
              msg.files ? (
                <Text key={index} style={styles.infoText}>
                  {msg.files.name || "File " + (index + 1)}
                </Text>
              ) : null
            )}
          </View>
        )}
      </View>

      {/* Action Dropdown */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => setShowActionDropdown(!showActionDropdown)}
      >
        <Text style={styles.actionButtonText}>
          {selectedAction || "Select Action"}
        </Text>
      </TouchableOpacity>
      {showActionDropdown && (
        <View style={styles.dropdownMenu}>
          {actions.map((action) => (
            <TouchableOpacity
              key={action}
              style={styles.dropdownItem}
              onPress={() => handleActionSelect(action)}
            >
              <Text style={styles.dropdownItemText}>{action}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* File Upload */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Attach Files</Text>
        <TouchableOpacity style={styles.fileUpload} onPress={handleFileSelect}>
          <Text style={styles.fileUploadText}>
            Upload Files ({files.length} selected)
          </Text>
        </TouchableOpacity>
        {files.length > 0 && (
          <View style={styles.selectedFilesContainer}>
            <Text style={styles.selectedFilesLabel}>Selected Files:</Text>
            {files.map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <Text style={styles.fileName}>{file.name}</Text>
                <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                  <Ionicons name="close" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Description Input */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Add a Comment (Optional)</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Enter your comment here..."
          placeholderTextColor="#ccc"
          value={descriptionBody}
          onChangeText={setDescriptionBody}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? "Submitting..." : "Submit Response"}
        </Text>
      </TouchableOpacity>

      {/* Error Message */}
      {isError && (
        <Text style={styles.errorText}>
          {mutationError.message || "Failed to update request."}
        </Text>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#001D3D" },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    marginBottom: 20,
  },
  employeeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: { width: 60, height: 60, borderRadius: 50, marginRight: 10 },
  employeeName: { color: "white", fontSize: 24, fontWeight: "bold" },
  requestInfo: { marginBottom: 20 },
  infoText: { color: "white", fontSize: 16, marginVertical: 2 },
  actionButton: { padding: 10, backgroundColor: "#333", borderRadius: 5 },
  actionButtonText: { color: "white", fontSize: 16 },
  dropdownMenu: {
    position: "absolute",
    top: 220,
    left: 20,
    backgroundColor: "#333",
    borderRadius: 5,
    zIndex: 10,
  },
  dropdownItem: { padding: 10 },
  dropdownItemText: { color: "white", fontSize: 16 },
  fieldContainer: { marginVertical: 20 },
  label: { color: "white", fontSize: 16, marginBottom: 5 },
  fileUpload: { padding: 10, backgroundColor: "#444", borderRadius: 5 },
  fileUploadText: { color: "white", fontSize: 16 },
  selectedFilesContainer: { marginTop: 10 },
  selectedFilesLabel: { color: "white", fontSize: 16, fontWeight: "bold" },
  fileItem: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  fileName: { color: "white", fontSize: 14, marginRight: 10 },
  submitButton: { padding: 15, backgroundColor: "#007AFF", borderRadius: 5 },
  submitButtonText: { color: "white", fontSize: 16, textAlign: "center" },
  descriptionInput: {
    backgroundColor: "#333",
    color: "white",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HRRequestDetails;
