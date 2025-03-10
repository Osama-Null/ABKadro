import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ProfileInfo = ({ route }) => {
  const { name, image, department, email, phone, position } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.position}>{position}</Text>
      <Text style={styles.department}>{department}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#001D3D", alignItems: "center" },
  image: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  position: { fontSize: 18, color: "#fff" },
  department: { fontSize: 16, color: "#fff" },
  email: { fontSize: 16, color: "#fff" },
  phone: { fontSize: 16, color: "#fff" },
  errorText: { fontSize: 18, color: "red" },
});

export default ProfileInfo;