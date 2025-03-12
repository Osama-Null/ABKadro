import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const FileViewer = ({ route }) => {
  const { filePath } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: filePath }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#001D3D", alignItems: "center" },
  image: { width: 300, height: 400, borderRadius: 10 },
});

export default FileViewer;