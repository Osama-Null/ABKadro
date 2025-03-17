import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Picker } from "@react-native-picker/picker";

const HRRequestDetails = ({ route }) => {
  const navigation = useNavigation();
  const { request, employee } = route.params;

  const [status, setStatus] = useState(request.status);
  const [comments, setComments] = useState(request.comments || "");
  const [selectedAction, setSelectedAction] = useState("");

  const handleSave = () => {
    const updatedStatus = selectedAction || status;
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
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 20, left: 20, zIndex: 999 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          fontSize: 30,
          color: "white",
        }}
      >
        Request Details
      </Text>

      {/* Employee Info */}
      <View
        style={{
          alignItems: "center",
          marginTop: 50,
          marginBottom: 40,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: employee.image }}
          style={{ width: 60, height: 60, borderRadius: 50 }}
        />
        <View>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            {employee.name}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {employee.department} - {employee.position}
          </Text>
        </View>
      </View>

      {/* Request Info */}
      <View>
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: "5%",
          }}
        >
          <BlurView
            intensity="50"
            style={{
              width: "100%",
              padding: 15,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View gap={5}>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Type
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Submitted
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Details
              </Text>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Status
              </Text>
            </View>
            <View gap={5}>
              <Text style={{ color: "gold", fontSize: 20, fontWeight: "bold" }}>
                {request.type}
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                {request.submittedDate}
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>
                {request.details}
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>{status}</Text>
            </View>
          </BlurView>
        </View>
      </View>

      {/* Action Section */}
      <View
        style={{
          width: "100%",
          alignSelf: "center",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: "5%",
        }}
      >
        <BlurView
          intensity="50"
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Picker
            selectedValue={selectedAction}
            onValueChange={(itemValue) => setSelectedAction(itemValue)}
            style={{
              width: "100%",
              color: "white",
            }}
          >
            <Picker.Item label="Select Action" value="" />
            <Picker.Item label="Accept" value="accept" />
            <Picker.Item label="Reject" value="reject" />
          </Picker>
        </BlurView>
      </View>

      {/* Comment Section */}
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
          }}
          placeholder="Add a comment..."
          value={comments}
          onChangeText={setComments}
          multiline
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#03fcc6",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
        }}
        onPress={handleSave}
      >
        <Text style={{ color: "#001D3D", fontSize: 18, fontWeight: "bold" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HRRequestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
    padding: 20,
  },
});
