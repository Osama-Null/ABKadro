import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import employees from "../data/employees";
import files from "../data/files";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const RequestDetails = ({ route }) => {
  const {
    title,
    type,
    status,
    description,
    isReturned,
    empImage,
    empId,
    name,
    department,
    email,
    phone,
    position,
  } = route.params;
  const navigation = useNavigation();

  // Get the current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // State to manage file visibility
  const [showFiles, setShowFiles] = useState(false);

  // Function to handle icon click
  const handleIconClick = () => {
    const requestFiles = files.find(file => file.requestId === route.params.reqId);
    if (requestFiles && requestFiles.messages.length > 0) {
      const firstFilePath = requestFiles.messages[0].files[0].filePath;
      console.log(`Opening file: ${firstFilePath}`);
      // Navigate to a new screen or display the file
      navigation.navigate('FileViewer', { filePath: firstFilePath });
    }
  };

  // Filter files for the current request
  const requestFiles = files.filter(file => file.requestId === route.params.reqId);

  return (
    <View style={styles.container}>
      {/* Header with Employee Image */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 15,
        }}
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "yellow",
            borderRadius: 100,
            overflow: "hidden",
            width: 50,
            height: 50,
          }}
          onPress={() => navigation.navigate('ProfileInfo', {
            empId,
            name,
            image: empImage,
            department,
            email,
            phone,
            position,
          })}
        >
          <Image
            source={{ uri: empImage }}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.type}>Type: {type}</Text>
        <Text
          style={[
            styles.status,
            status === "Rejected" ? styles.rejected : styles.accepted,
          ]}
        >
          {status}
        </Text>
      </View>

      {/* Display Messages */}
      {requestFiles.map((requestFile) => (
        requestFile.messages.map((message) => (
          <View key={message.messageId} style={styles.messageContainer}>
            <Text style={styles.sender}>
              {isNaN(message.userId) ? "Admin" : "You"}
            </Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                {message.descriptionBody || "No additional details available."}
              </Text>
            </View>
          </View>
        ))
      ))}

      {/* Clickable Icon */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleIconClick}
      >
        <MaterialCommunityIcons name="paperclip" size={24} color="white" />
      </TouchableOpacity>

      {/* Display Files */}
      {showFiles && (
        <FlatList
          data={requestFiles}
          keyExtractor={(item) => item.messageId.toString()}
          renderItem={({ item }) => (
            <View style={styles.fileContainer}>
              {item.messages.map((message) => (
                <View key={message.messageId} style={styles.messageContainer}>
                  <Text style={styles.messageText}>{message.descriptionBody}</Text>
                  {message.files.map((file) => (
                    <TouchableOpacity key={file.messageFileId} onPress={() => console.log(`Opening file: ${file.filePath}`)}>
                      <Text style={styles.fileText}>{file.fileName}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          )}
        />
      )}

      {/* Add Info Button - Only if Returned */}
      {isReturned && (
        <View style={styles.buttonContainer}>
          <Button
            title="Add Info"
            onPress={() => console.log("Adding info...")}
            color="#FF8C00"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#001D3D" },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  date: { fontSize: 16, color: "#fff", marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  type: { fontSize: 18, color: "#FF6347" },
  status: { fontSize: 18, fontWeight: "bold" },
  accepted: { color: "green" },
  rejected: { color: "red" },
  descriptionContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    minHeight: 100,
  },
  description: { fontSize: 16, color: "#000" },
  sender: { fontSize: 14, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  iconContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  fileContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  fileText: {
    fontSize: 14,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  buttonContainer: { marginTop: 20, alignSelf: "center" },
});

export default RequestDetails;