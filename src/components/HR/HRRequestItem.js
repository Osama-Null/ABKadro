import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HRRequestItem = ({
  reqId,
  reqEmployeeId,
  reqHrReviewerId,
  reqType,
  reqStatus,
  reqSubmittedDate,
  reqReviewedDate,
  reqDetails,
  reqComments,
  //-------------------
  empName,
  empImage,
  empDepartment,
  empPosition,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HRRequestDetails", {
          request: {
            id: reqId,
            employeeId: reqEmployeeId,
            type: reqType,
            status: reqStatus,
            submittedDate: reqSubmittedDate,
            reviewedDate: reqReviewedDate,
            details: reqDetails,
            comments: reqComments,
            hrReviewerId: reqHrReviewerId,
          },
          employee: {
            name: empName,
            image: empImage,
            department: empDepartment,
            position: empPosition,
          },
        })
      }
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
          borderBottomColor: "#001D3D"
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
            <Image source={{ uri: empImage }} width={50} height={50} />
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
              {empName}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "normal",
                fontFamily: "Roboto",
              }}
            >
              {reqSubmittedDate}
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
            {empDepartment} - {empPosition}
          </Text>
          <Text
            style={{
              color: "orange",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            ● {reqType}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HRRequestItem;

const styles = StyleSheet.create({});
