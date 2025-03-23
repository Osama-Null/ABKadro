import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  typeOfRequestMap,
  typeOfVacationMap,
  complaintTypeMap,
} from "../../constants/enums";

const ReqHistoryDetails = ({ route }) => {
  const { request } = route.params;
  const navigation = useNavigation();
  console.log(request);

  return (
    <View style={styles.container}>
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
        <Text style={styles.header}>Request Details</Text>
        <LottieView
          source={require("../../../assets/details.json")}
          autoPlay
          loop={true}
          style={{ width: 200, height: 200, top: 23 }} // Adjust size
        />
      </View>
      <View flex={2} width={"100%"} padding={20}>
        <View
          style={{
            borderRadius: 10,
            overflow: "hidden",
            gap: 20,
          }}
        >
          <BlurView
            intensity={50}
            padding={10}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Text
              style={{
                color: "orange",
                fontSize: 16,
                marginVertical: 5,
                fontWeight: "bold",
              }}
            >
              Request type:{" "}
            </Text>
            <Text style={styles.details}>
              {typeOfRequestMap[request.typeOfRequest]}
            </Text>
          </BlurView>
          <BlurView
            intensity={50}
            padding={10}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Text
              style={{
                color: "orange",
                fontSize: 16,
                marginVertical: 5,
                fontWeight: "bold",
              }}
            >
              Type of {typeOfRequestMap[request.typeOfRequest]}:{" "}
            </Text>
            <Text style={styles.details}>
              {request.typeOfRequest == 0
                ? typeOfVacationMap[request.typeOfVacation]
                : complaintTypeMap[request.typeOfComplaint]}
              {typeOfRequestMap[request.typeOfRequest]}
            </Text>
          </BlurView>
          <BlurView
            intensity={50}
            padding={10}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Text
              style={{
                color: "orange",
                fontSize: 16,
                marginVertical: 5,
                fontWeight: "bold",
              }}
            >
              Created at:{" "}
            </Text>
            <Text style={styles.details}>
              {new Date(request.createdAt).toLocaleDateString()}
            </Text>
          </BlurView>
          {request.typeOfRequest === 0 && (
            <BlurView
              intensity={50}
              padding={10}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text
                style={{
                  color: "orange",
                  fontSize: 16,
                  marginVertical: 5,
                  fontWeight: "bold",
                }}
              >
                Date:{" "}
              </Text>
              <View flexDirection={"row"} gap={20}>
                <Text style={styles.details}>
                  {new Date(request.startDate).toLocaleDateString()}
                </Text>
                <Text style={styles.details}>-</Text>
                <Text style={styles.details}>
                  {new Date(request.endDate).toLocaleDateString()}
                </Text>
              </View>
            </BlurView>
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
    gap: 50,
  },
  header: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    position: "absolute",
    top: 20,
  },
  details: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ReqHistoryDetails;
