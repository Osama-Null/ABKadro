import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system"; // For file downloading
import * as Sharing from "expo-sharing"; // For sharing the file
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  typeOfRequestMap,
  vacationStatusMap,
  complaintStatusMap,
  departmentMap,
  positionMap,
} from "../../constants/enums.js";
import { respondToRequest } from "../../api/admins.js";
import { useMutation } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { Image as ExpoImage } from "expo-image"; // For image viewing
import { WebView } from "react-native-webview"; // For PDF viewing

const HRRequestDetails = ({ route }) => {
  const navigation = useNavigation();
  const { request, employee } = route.params || {};
  console.log("\n\nRequest Details: ", request, "\n\n");

  // State Management
  const [selectedAction, setSelectedAction] = useState(null);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [descriptionBody, setDescriptionBody] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // Track the file to view
  const [isViewingFile, setIsViewingFile] = useState(false); // Control modal visibility

  // Mutation Setup
  const queryClient = useQueryClient();
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
      // Invalidate all queries to refetch data across all screens
      queryClient.invalidateQueries(); // No specific key = refetch all queries
      // Redirect to home screen
      navigation.navigate("HRHome");
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
  const vacationActions = ["Approve", "Reject", "Request Documents"];
  const complaintActions = ["Resolved", "Return for Response"];
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
        Resolved: 2,
        "Return for Response": 1,
      };
      return complaintEnum[action];
    }
  };

  // Format File Name Function
  const formatFileName = (fileName) => {
    if (!fileName) return "Unknown File";
    const parts = fileName.split(".");
    if (parts.length < 2) return fileName; // No extension
    const name = parts[0];
    const extension = parts.slice(1).join(".");
    if (name.length > 4) {
      return `${name.substring(0, 4)}***.${extension}`;
    } else {
      return fileName;
    }
  };

  // Download and Share File Function
  const downloadAndShareFile = async (fileUrl, fileName) => {
    try {
      // Step 1: Download to a temporary location
      const tempUri = `${FileSystem.cacheDirectory}${fileName}`;
      const { uri } = await FileSystem.downloadAsync(fileUrl, tempUri);
      console.log("File downloaded to:", uri);

      // Step 2: Open the share dialog
      await Sharing.shareAsync(uri);
      // The user can now choose to save the file wherever they want
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to download or share the file.");
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

  // Handle File Viewing
  const handleViewFile = (fileArray) => {
    const file = fileArray[0]; // Get the first file from the array
    const baseUrl = "http://192.168.2.32:5208"; // Replace with your backend server’s IP address
    const filename = file.filePath.split(/[\\/]/).pop(); // Extract filename
    const fileUrl = `${baseUrl}/files/${filename}`; // Construct the full URL
    const fileType = file.fileType || getFileTypeFromExtension(filename);

    setSelectedFile({
      ...file,
      uri: fileUrl,
      fileType,
      fileName: file.fileName,
    });
    setIsViewingFile(true); // Open modal
  };

  // Fallback to determine file type from extension
  const getFileTypeFromExtension = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return "image/" + extension;
    } else if (extension === "pdf") {
      return "application/pdf";
    }
    return "application/octet-stream"; // Default type
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
          <Text
            style={{
              fontSize: 15,
              color: "white",
            }}
          >
            {departmentMap[employee?.department]} -{" "}
            {positionMap[employee?.position]}
          </Text>
        </View>
      </View>

      {/* Request Info */}
      <View style={styles.requestInfo}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              borderRadius: 5,
              overflow: "hidden",
              flex: 1,
            }}
          >
            <BlurView
              intensity={50}
              style={{
                padding: 10,
                gap: 20,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "orange",
                  fontSize: 18,
                  marginVertical: 2,
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Type:
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginVertical: 2,
                  alignSelf: "center",
                }}
              >
                {typeOfRequestMap[request.typeOfRequest]}
              </Text>
            </BlurView>
          </View>
          <View
            style={{
              borderRadius: 5,
              overflow: "hidden",
              flex: 1,
            }}
          >
            <BlurView
              intensity={50}
              style={{
                padding: 10,
                gap: 20,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  color: "orange",
                  fontSize: 18,
                  marginVertical: 2,
                  alignSelf: "center",
                  fontWeight: "bold",
                }}
              >
                Status:
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginVertical: 2,
                  alignSelf: "center",
                }}
              >
                {request.typeOfRequest === 0
                  ? vacationStatusMap[request.requestStatus]
                  : complaintStatusMap[request.complaintStatus]}
              </Text>
            </BlurView>
          </View>
        </View>

        {request.typeOfRequest === 0 && (
          <>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginBottom: 0,
                fontWeight: "bold",
              }}
            >
              Date:
            </Text>
            <View
              style={{
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <BlurView
                intensity={50}
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {new Date(request.startDate).toLocaleDateString()}
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
                    color="orange"
                    alignSelf="center"
                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {new Date(request.endDate).toLocaleDateString()}
                </Text>
              </BlurView>
            </View>
          </>
        )}

        {request.messages && request.messages.length > 0 && (
          <View>
            <Text style={styles.label}>Submitted Files:</Text>
            {request.messages.map((msg, index) =>
              msg.files && msg.files.length > 0 ? (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderRadius: 5,
                    overflow: "hidden",
                    borderWidth: 0.5,
                    borderColor: "orange",
                  }}
                  onPress={() => handleViewFile(msg.files)}
                >
                  <BlurView
                    intensity={50}
                    style={{
                      flexDirection: "row",
                      padding: 5,
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        flexDirection: "row",
                      }}
                    >
                      <Entypo name="attachment" size={20} color="orange" />
                      <Text
                        style={{
                          color: "orange",
                          fontSize: 16,
                          marginVertical: 2,
                        }}
                      >
                        {formatFileName(msg.files[0].fileName)}
                      </Text>
                    </View>
                    <FontAwesome name="file-text" size={24} color="orange" />
                  </BlurView>
                </TouchableOpacity>
              ) : null
            )}
          </View>
        )}
      </View>

      {/* Action Dropdown */}
      <Text style={styles.label}>Action</Text>
      <BlurView
        intensity={50}
        style={{
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
          onPress={() => setShowActionDropdown(!showActionDropdown)}
        >
          <Text style={styles.actionButtonText}>
            {selectedAction || "Select Action"}
          </Text>
        </TouchableOpacity>
      </BlurView>

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

      {/* Description Input */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Add a Comment (Optional)</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Enter your comment here..."
          placeholderTextColor="#rgba(0, 0, 0, 0.48)"
          value={descriptionBody}
          onChangeText={setDescriptionBody}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* File Upload */}
      <View style={styles.fieldContainer}>
        <BlurView
          intensity={50}
          style={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              justifyContent: "center",
            }}
            onPress={handleFileSelect}
          >
            <Text style={styles.fileUploadText}>
              Upload Files ({files.length} selected)
            </Text>
          </TouchableOpacity>
        </BlurView>

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

      {/* Modal for File Viewing */}
      <Modal
        visible={isViewingFile}
        onRequestClose={() => setIsViewingFile(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {selectedFile ? (
            selectedFile.fileType?.includes("image") ? (
              <ExpoImage
                source={{ uri: selectedFile.uri }}
                style={styles.modalImage}
                contentFit="contain"
              />
            ) : (
              <WebView
                source={{ uri: selectedFile.uri }}
                style={styles.modalWebView}
                startInLoadingState={true}
                renderLoading={() => (
                  <ActivityIndicator size="large" color="#ffffff" />
                )}
              />
            )
          ) : (
            <Text style={styles.errorText}>File not found.</Text>
          )}
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() =>
              selectedFile &&
              downloadAndShareFile(selectedFile.uri, selectedFile.fileName)
            }
          >
            <Ionicons name="download" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsViewingFile(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// Updated Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#001D3D" },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    marginBottom: 20,
    alignSelf: "center",
  },
  employeeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: { width: 50, height: 50, borderRadius: 50, marginRight: 10 },
  employeeName: { color: "white", fontSize: 20, fontWeight: "bold" },
  requestInfo: { marginBottom: 20, gap: 10 },
  infoText: {
    color: "white",
    fontSize: 16,
    marginVertical: 2,
    alignSelf: "center",
    fontWeight: "bold",
  },
  actionButton: { padding: 10, backgroundColor: "#333", borderRadius: 5 },
  actionButtonText: { color: "white", fontSize: 16 },
  dropdownMenu: {
    backgroundColor: "#0F4277",
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: { padding: 10 },
  dropdownItemText: { color: "white", fontSize: 16 },
  fieldContainer: { marginVertical: 15 },
  label: { color: "white", fontSize: 16, marginBottom: 5, fontWeight: "bold" },
  fileUpload: { padding: 10, backgroundColor: "#444", borderRadius: 5 },
  fileUploadText: { color: "white", fontSize: 16 },
  selectedFilesContainer: { marginTop: 10 },
  selectedFilesLabel: { color: "white", fontSize: 16, fontWeight: "bold" },
  fileItem: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  fileName: { color: "white", fontSize: 14, marginRight: 10 },
  submitButton: { padding: 15, backgroundColor: "#007AFF", borderRadius: 5 },
  submitButtonText: { color: "white", fontSize: 16, textAlign: "center" },
  descriptionInput: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#001D3D",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "80%",
  },
  modalWebView: {
    width: "100%",
    height: "80%",
  },
  downloadButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});

export default HRRequestDetails;
