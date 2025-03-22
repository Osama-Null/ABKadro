import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMyRequests, addMessageToRequest } from "../../api/employees";
import {
  typeOfRequestMap,
  typeOfVacationMap,
  complaintTypeMap,
  vacationStatusMap,
  complaintStatusMap,
} from "../../constants/enums";

// Placeholder for logged-in user's ID (replace with actual logic)
const loggedInUserId = "emp1"; // Example: Replace with actual user ID from auth context

const EmployeeRequestDetails = ({ route }) => {
  const { request } = route.params; // Request data passed via navigation
  const navigation = useNavigation();
  const [message, setMessage] = useState(""); // Text input for new message
  const [file, setFile] = useState(null); // Selected file for upload

  // Fetch all requests to get updated messages
  const { data: requests, refetch } = useQuery({
    queryKey: ["fetchMyRequests"],
    queryFn: () => getMyRequests(),
  });

  // Find the current request's messages from fetched data or fallback to route params
  const currentRequest =
    requests?.find((req) => req.requestId === request.requestId) || request;
  const messages = currentRequest?.messages || [];

  // Sort messages by creation date
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // Mutation to add a new message with file support and error handling
  const addMessageMutation = useMutation({
    mutationFn: ({ descriptionBody, files }) =>
      addMessageToRequest(request.requestId, descriptionBody, files),
    onSuccess: () => {
      refetch(); // Refresh the message list
      setMessage(""); // Clear input
      setFile(null); // Clear file selection
    },
    onError: (error) => {
      console.error("Error adding message:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("Failed to send message");
    },
  });

  // Function to pick a file using DocumentPicker
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      const selectedFile = {
        uri: result.uri,
        name: result.name,
        type: result.mimeType || "application/octet-stream",
      };
      setFile(selectedFile);
      console.log("File selected:", selectedFile);
    }
  };

  // Function to submit a message and/or file
  const submitMessage = () => {
    if (!message && !file) {
      alert("Please enter a message or select a file");
      return;
    }
    const files = file ? [file] : [];
    addMessageMutation.mutate({ descriptionBody: message, files });
  };

  // Render status icon based on request status
  const renderStatusIcon = () => {
    const status =
      request.typeOfRequest === 0
        ? vacationStatusMap[request.requestStatus]
        : complaintStatusMap[request.complaintStatus];
    let iconName;
    switch (status) {
      case "Approved":
      case "Resolved":
        iconName = "checkmark-circle";
        break;
      case "Rejected":
        iconName = "close-circle";
        break;
      default:
        iconName = "time";
    }
    return (
      <Ionicons
        name={iconName}
        size={24}
        color="gold"
        style={styles.statusIcon}
      />
    );
  };

  // Determine the other user's name (e.g., HR's name)
  const otherUserName = "HR"; // Replace with actual logic to get HR's name

  // Helper function to format date for separators
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // Render chat messages with date separators
  const renderMessages = () => {
    let currentDate = null;
    return sortedMessages.map((msg) => {
      const msgDate = formatDate(msg.createdAt);
      const isOwnMessage = msg.userId === loggedInUserId;
      const showDateSeparator = msgDate !== currentDate;
      currentDate = msgDate;

      return (
        <React.Fragment key={msg.messageId}>
          {showDateSeparator && (
            <View style={styles.dateSeparator}>
              <Text style={styles.dateText}>{msgDate}</Text>
            </View>
          )}
          <View
            style={[
              styles.messageContainer,
              isOwnMessage ? styles.ownMessage : styles.otherMessage,
            ]}
          >
            {!isOwnMessage && (
              <Image
                source={{ uri: msg.senderImage || "default-image-url" }}
                style={styles.avatar}
              />
            )}
            <View style={styles.bubble}>
              <Text style={styles.messageText}>{msg.descriptionBody}</Text>
              <Text style={styles.messageTime}>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            {isOwnMessage && (
              <Image
                source={{ uri: msg.senderImage || "default-image-url" }}
                style={styles.avatar}
              />
            )}
          </View>
        </React.Fragment>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        {request.typeOfRequest === 0 ? (
          <LottieView
            source={require("../../../assets/Animation_Calendar.json")}
            autoPlay
            loop
            width={150}
            height={150}
          />
        ) : (
          <LottieView
            source={require("../../../assets/Animation_Note.json")}
            autoPlay
            loop
            width={300}
            height={300}
          />
        )}
        <Text style={styles.requestTypeText}>
          {typeOfRequestMap[request.typeOfRequest]} Request
        </Text>
        <View style={styles.statusContainer}>{renderStatusIcon()}</View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsWrapper}>
        {/* Info Section: Type and Created At */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoButton}>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.value}>
                {request.typeOfRequest === 0
                  ? typeOfVacationMap[request.typeOfVacation]
                  : complaintTypeMap[request.typeOfComplaint]}
              </Text>
            </View>
            <View style={styles.infoButton}>
              <Text style={styles.label}>Created At</Text>
              <Text style={styles.value}>
                {new Date(request.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Date Range (for leave requests only) */}
        {request.typeOfRequest === 0 && (
          <View style={styles.dateSection}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginTop: 5,
                fontWeight: "bold",
              }}
            >
              {request.startDate
                ? new Date(request.startDate).toLocaleDateString()
                : "N/A"}
            </Text>
            <Entypo
              name="flow-line"
              size={24}
              color="gold"
              style={styles.flowIcon}
            />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                marginTop: 5,
                fontWeight: "bold",
              }}
            >
              {request.endDate
                ? new Date(request.endDate).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
        )}

        {/* Chatbox Section */}
        <ScrollView contentContainerStyle={styles.chatbox}>
          {/* Chat Header */}
          <View style={styles.chatHeader}>
            <Text style={styles.otherUserName}>{otherUserName}</Text>
          </View>

          {sortedMessages.length > 0 ? (
            renderMessages()
          ) : (
            <Text style={styles.noMessages}>No messages yet.</Text>
          )}
        </ScrollView>

        {/* Message Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor="white"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={pickFile}>
            <Ionicons name="attach" size={24} color="gold" />
          </TouchableOpacity>
          <TouchableOpacity onPress={submitMessage}>
            <Ionicons name="send" size={24} color="gold" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
  },
  header: {
    flex: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: "#0F4277",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  requestTypeText: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 25,
    position: "absolute",
    top: 20,
  },
  statusContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    position: "absolute",
    bottom: 20,
  },
  detailsWrapper: {
    flex: 3,
    padding: 20,
  },
  infoSection: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  infoButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  label: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 14,
  },
  value: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  flowIcon: {
    marginHorizontal: 20,
    transform: [{ rotate: "90deg" }],
  },
  otherUserName: {
    color: "#0F4277",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    backgroundColor: "gold",
    padding: 10,
    borderRadius: 100,
  },
  chatbox: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 10,
  },
  dateSeparator: {
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    color: "#0F4277",
    fontSize: 14,
    fontWeight: "bold",
  },
  ownMessage: {
    justifyContent: "flex-end",
  },
  otherMessage: {
    justifyContent: "flex-start",
  },
  bubble: {
    backgroundColor: "#0F4277",
    padding: 10,
    borderRadius: 10,
    maxWidth: "50%", // Prevent bubble overflow
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  messageTime: {
    alignSelf: "flex-end",
    fontSize: 10,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gold",
    borderRadius: 20,
    padding: 10,
    marginRight: 0,
    color: "white",
  },
  noMessages: {
    color: "#0F4277",
    textAlign: "center",
    marginTop: 100,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default EmployeeRequestDetails;
