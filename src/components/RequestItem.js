import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RequestItem = ({
  key,
  reqEmployeeId,
  reqHrReviewerId,
  reqType,
  reqStatus,
  reqSubmittedDate,
  reqReviewedDate,
  reqDetails,
  reqComments,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RequestDetails", {
          requestId: key,
        })
      }
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#001D3D",
          borderRadius: 5,
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
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
                fontSize: 14,
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              {Employees[0].empName}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 11,
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
              fontSize: 11,
              fontWeight: "500",
              fontFamily: "Roboto",
            }}
          >
            {Employees[0].empDepartment} - {Employees[0].empPosition}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 13,
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

export default RequestItem;

const styles = StyleSheet.create({});
