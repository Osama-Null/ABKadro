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
import {
  positionMap,
  departmentMap,
  typeOfRequestMap,
  complaintTypeMap,
  typeOfVacationMap,
  vacationStatusMap,
  complaintStatusMap,
} from "../../constants/enums";
import Entypo from "@expo/vector-icons/Entypo";

const HRRequestDetails = ({ route }) => {
  const navigation = useNavigation();
  const { request, employee } = route.params;
  console.log("items", request, "\n\nItems2", employee);

  const [showActionDropdown, setShowActionDropdown] = useState(false);

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
        <Image source={{ uri: employee.image }} style={{}} />

        <Image
          source={
            employee.profilePicture
              ? { uri: employee.profilePicture }
              : require("../../../assets/profile.png")
          }
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
          }}
        />
        <View>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            {employee.firstName} {employee.lastName}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {departmentMap[employee.department]} -{" "}
            {positionMap[employee.position]}
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
              {request.typeOfRequest === 0 ? (
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Date
                </Text>
              ) : (
                ""
              )}
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Status
              </Text>
            </View>
            <View gap={5}>
              {request.typeOfRequest === 0 ? (
                <View flexDirection={"row"} gap={5}>
                  <Text
                    style={{
                      color: "#4CAF50",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {typeOfRequestMap[request.typeOfRequest]}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {typeOfVacationMap[request.typeOfVacation]}
                  </Text>
                </View>
              ) : (
                <View flexDirection={"row"} gap={5}>
                  <Text
                    style={{
                      color: "orange",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {typeOfRequestMap[request.typeOfRequest]}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {complaintTypeMap[request.typeOfComplaint]}
                  </Text>
                </View>
              )}

              <Text style={{ color: "white", fontSize: 16 }}>
                {new Date(request.createdAt).toLocaleDateString()}
              </Text>
              {request.typeOfRequest === 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    {new Date(request.startDate).toLocaleDateString()}
                    {/* only of it's a vacation */}
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
                      color="#4CAF50"
                      alignSelf="center"
                    />
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    {new Date(request.endDate).toLocaleDateString()}
                    {/* only of it's a vacation */}
                  </Text>
                </View>
              ) : (
                ""
              )}
              <Text style={{ color: "white", fontSize: 16 }}>
                {request.typeOfRequest === 0
                  ? vacationStatusMap[request.requestStatus]
                  : complaintStatusMap[request.complaintStatus]}
              </Text>
            </View>
          </BlurView>
        </View>
      </View>

      {/* Action Section */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Type of Vacation</Text>
        <BlurView intensity={50} style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowActionDropdown(!showActionDropdown)}
          >
            <Text style={styles.dropdownText}>
              {formData.vacationStatus || "Select Action"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="white" />
          </TouchableOpacity>
        </BlurView>
        {showActionDropdown && (
          <View style={styles.dropdownMenu}>
            {Object.values(typeOfVacationMap).map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.dropdownItem}
                onPress={() => handleActionTypeSelect(type)}
              >
                <Text style={styles.dropdownItemText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Comment Section */}

      {/* Save Button */}
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
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  dropdownContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  dropdownText: {
    color: "white",
    fontSize: 16,
  },
  dropdownMenu: {
    backgroundColor: "#0F4277",
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: "white",
    fontSize: 16,
  },
});
