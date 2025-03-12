import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

const Services = () => {
  const navigation = useNavigation();

  const handleSabbaticalRequest = () => {
    navigation.navigate('SabbaticalRequest');
  };

  const handleComplaintRequest = () => {
    navigation.navigate('ComplaintRequest');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Services</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.requestButton}
          onPress={handleSabbaticalRequest}
        >
          <Text style={styles.buttonText}>Sabbatical Request</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.requestButton}
          onPress={handleComplaintRequest}
        >
          <Text style={styles.buttonText}>Complaint Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
  },
  requestButton: {
    backgroundColor: '#FFC300',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
