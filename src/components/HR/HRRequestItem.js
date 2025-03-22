import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  positionMap,
  departmentMap,
  typeOfRequestMap,
} from "../../constants/enums";

const HRRequestItem = ({ request, employee }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("HRRequestDetails", { request, employee })}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 10,
          borderRadius: 5,
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#001D3D",
        }}
      >
        <View
          style={{
            alignItems: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderRadius: "100%",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={
                employee.profilePicture
                  ? { uri: employee.profilePicture }
                  : require("../../../assets/profile.png")
              }
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>
        </View>
        <View flex={9}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              weight: "80%",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              {employee.firstName} {employee.lastName}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "normal",
                fontFamily: "Roboto",
              }}
            >
              {new Date(request.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "500",
              fontFamily: "Roboto",
            }}
          >
            {employee.department != null
              ? departmentMap[employee?.department]
              : "Unknown Department"}{" "}
            -{" "}
            {employee.position != null
              ? positionMap[employee?.position]
              : "Unknown Department"}
          </Text>
          <Text
            style={{
              color: request?.typeOfRequest === 0 ? "#4CAF50" : "orange",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            ● {typeOfRequestMap[request?.typeOfRequest]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HRRequestItem;

const styles = StyleSheet.create({});
