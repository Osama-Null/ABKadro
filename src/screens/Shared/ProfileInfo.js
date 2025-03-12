import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileInfo = ({ route }) => {
  const navigation = useNavigation();
  const { employee } = route.params;

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
          onPress={() => navigation.navigate("Login")}
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
        <Image
          source={{ uri: employee.empImage }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{employee.empName}</Text>
        <Text style={styles.position}>{employee.empPosition}</Text>
        <Text style={styles.department}>{employee.empDepartment}</Text>
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
            <FontAwesome name="phone" size={20} style={styles.icon} />
            <AntDesign name="star" size={20} style={styles.icon} />
          </View>
          <View>
            <Text style={styles.txt}> {employee.empEmail}</Text>
            <Text style={styles.txt}> {employee.empPhone}</Text>
            <Text style={styles.txt}> {employee.empRating}/5</Text>
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
    marginBottom: 20,
  },
  icon: {
    color: "gold",
    marginBottom: 20,
  },
});

export default ProfileInfo;
