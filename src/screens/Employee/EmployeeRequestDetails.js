import Reac, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import Entypo from "@expo/vector-icons/Entypo";

const EmployeeRequestDetails = ({ route }) => {
  const { request } = route.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  // File selection
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setFile(result);
    }
  };

  // Function to submit message and/or file
  const submitMessage = async () => {
    const formData = new FormData();
    formData.append("RequestId", request.requestId);
    if (message) formData.append("DescriptionBody", message);
    if (file) {
      formData.append("Files", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/octet-stream",
      });
    }

    try {
      const response = await fetch("YOUR_API_URL/requests/add-message", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          // Add authentication headers if required (e.g., Authorization: Bearer <token>)
        },
      });
      if (response.ok) {
        console.log("Message submitted successfully");
        setMessage(""); // Clear input after submission
        setFile(null); // Clear file after submission
      } else {
        console.error("Failed to submit message:", response.status);
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          width: "100%",
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0F4277",
        }}
      >
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

        {request.typeOfRequest === 0 ? (
          <LottieView
            source={require("../../../assets/Animation_Calendar.json")}
            autoPlay
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <LottieView
            source={require("../../../assets/Animation_Note.json")}
            autoPlay
            loop={true}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Text
          style={{
            color: "#03fcc6",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          {request.typeOfRequest === 0 ? "Vacation" : "Complaint"} request
        </Text>
      </View>

      {/* Request Details */}
      <View style={styles.container2}>
        <View style={styles.detailsWrapper}>
          {/* Info Section*/}
          <View style={styles.infoSection}>
            {/* Row 1 */}
            <View style={styles.infoRow}>
              <View style={styles.infoButton}>
                <Text style={styles.label}>Type</Text>
                <Text style={styles.value}>
                  {request.typeOfRequest === 0 ? "Vacation" : "Complaint"}
                </Text>
              </View>
              <View style={styles.infoButton}>
                <Text style={styles.label}>Created at</Text>
                <Text style={styles.value}>
                  {new Date(request.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
            {/* Row 2 */}
            <View style={styles.infoRow}>
              <View style={styles.infoButton}>
                <Text style={styles.label}>Label 3</Text>
                <Text style={styles.value}>Value 3</Text>
              </View>
              <View style={styles.infoButton}>
                <Text style={styles.label}>Label 4</Text>
                <Text style={styles.value}>Value 4</Text>
              </View>
            </View>
          </View>

          {/* Date Range */}
          {request.typeOfRequest === 0 && (
            <View style={styles.dateSection}>
              <Text style={styles.dateText}>
                {request.startDate
                  ? new Date(request.startDate).toLocaleDateString()
                  : "N/A"}
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
                  color="gold"
                  alignSelf="center"
                />
              </View>
              <Text style={styles.dateText}>
                {request.endDate
                  ? new Date(request.endDate).toLocaleDateString()
                  : "N/A"}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
    alignItems: "center",
  },
  container2: {
    flex: 2,
    backgroundColor: "#001D3D",
    width: "100%",
    paddingHorizontal: 20,
  },
  detailsWrapper: {
    marginVertical: 70,
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
    flexDirection: "row",
    gap: 40,
    justifyContent: "center",
  },
  dateText: {
    color: "white",
    fontSize: 14,
    marginVertical: 2,
    fontWeight: "bold",
  },
});

export default EmployeeRequestDetails;
