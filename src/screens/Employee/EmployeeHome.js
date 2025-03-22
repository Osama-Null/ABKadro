import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import EmployeeMyRequestList from "../../components/Employee/EmployeeMyRequestList";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../api/shared";

import Entypo from "@expo/vector-icons/Entypo";

const EmployeeHome = () => {
  const navigation = useNavigation();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchMyProfile"],
    queryFn: () => getMyProfile(),
  });

  // Handle loading and error states
  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  if (isError) {
    return <Text style={styles.errorText}>Error fetching profile</Text>;
  }

  // const MyProfile = data;
  const MyProfile = data;
  console.log("\nMy profile data: ", MyProfile);
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View
          flex={1}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "5%",
            alignItems: "center",
          }}
        >
          <View
            flexDirection={"row"}
            style={{
              flexDirection: "row",
              gap: 15,
            }}
          >
            {/* img */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EmployeeProfileInfo", MyProfile)
              }
            >
              {/* <Image
                source={require("../../../assets/profile.png")}
                style={{ width: 50, height: 50 }}
              /> */}
              {MyProfile.profilePicture ? (
                <Image
                  source={{ uri: MyProfile.profilePicture }}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
              ) : (
                <Image
                  source={require("../../../assets/profile.png")}
                  style={{ width: 40, height: 40, borderRadius: 100, top: 5 }}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.86)",
                  fontSize: 20,
                }}
              >
                Welcome, {MyProfile.firstName} {MyProfile.lastName}
              </Text>
              <Text style={styles.header}>Dashboard</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Entypo name="chat" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <EmployeeMyRequestList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
    padding: 20,
    paddingTop: 10,
  },
  section: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  filterIcon: {
    padding: 10,
  },
  picker: {
    backgroundColor: "#fff",
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  requestCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accepted: {
    color: "green",
  },
  rejected: {
    color: "red",
  },
  pending: {
    color: "orange",
  },
});

export default EmployeeHome;
