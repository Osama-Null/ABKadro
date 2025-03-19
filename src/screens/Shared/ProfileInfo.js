import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { positionMap, departmentMap } from "../../constants/enums";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { deleteToken } from "../../api/storage";

const ProfileInfo = ({ route }) => {
  const navigation = useNavigation();
  const MyProfile = route.params;
  console.log("See me", MyProfile);

  const handleLogout = async () => {
    await deleteToken();
    setIsAuth(false);
  };

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
            bottom: 0,
            right: 20,
          }}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={30} color="red" />
        </TouchableOpacity>
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
        {MyProfile.profilePicture ? (
          <Image
            source={{ uri: MyProfile.profilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../../../assets/profile.png")}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.name}>
          {MyProfile.firstName} {MyProfile.lastName}
        </Text>
        <Text style={styles.position}>
          {positionMap[MyProfile?.position] || "Unknown Position"}
        </Text>
        <Text style={styles.department}>
          {departmentMap[MyProfile?.department] || "Unknown Department"}
        </Text>
      </View>

      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 30,
          }}
        >
          <View>
            <MaterialIcons name="email" size={20} style={styles.icon} />
            {MyProfile?.role === "Employee" && (
              <>
                <MaterialIcons
                  name="event-available"
                  size={20}
                  style={styles.icon}
                />
                <MaterialIcons name="sick" size={20} style={styles.icon} />
              </>
            )}
          </View>
          <View>
            <Text style={styles.txt}>{MyProfile.email}</Text>
            {MyProfile?.role === "Employee" && (
              <>
                <Text style={styles.txt}>{MyProfile?.vacationDays}</Text>
                <Text style={styles.txt}>{MyProfile?.sickDays}</Text>
              </>
            )}
          </View>
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  position: {
    color: "white",
    fontSize: 18,
  },
  department: {
    color: "white",
    fontSize: 16,
  },
  txt: {
    fontSize: 15,
    color: "white",
    marginBottom: 25,
  },
  icon: {
    color: "gold",
    marginBottom: 20,
  },
});

export default ProfileInfo;
