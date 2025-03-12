import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SabbaticalRequest = () => {
  const [formData, setFormData] = useState({
    type: '',
    duration: '',
    additionalNotes: ''
  });

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const sabbaticalTypes = [
    'Annual Leave',
    'Sick Leave',
    'Half Day Leave',
    'High Education Exams',
    'Hospital Surgey Leave',
    'Patient Companion',
    'Treatment Abroad',
    'Marriage',
    'Maternity Leave',
    'Paternity Leave',
    'Hajj',
    'Bereavement Leave',
  ];

  const handleTypeSelect = (type) => {
    setFormData({...formData, type});
    setShowTypeDropdown(false);
  };

  const handleDateSelect = (day) => {
    setFormData({...formData, duration: day.dateString});
    setShowCalendar(false);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sabbatical Request</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type of Sabbatical</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowTypeDropdown(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {formData.type || 'Select Sabbatical Type'}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {formData.duration || 'Select Duration'}
            </Text>
            <MaterialCommunityIcons name="calendar" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any additional information"
            placeholderTextColor="#666"
            value={formData.additionalNotes}
            onChangeText={(text) => setFormData({...formData, additionalNotes: text})}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Type Dropdown Modal */}
      <Modal
        visible={showTypeDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTypeDropdown(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Sabbatical Type</Text>
              <TouchableOpacity onPress={() => setShowTypeDropdown(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            {sabbaticalTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleTypeSelect(type)}
              >
                <Text style={styles.dropdownItemText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Duration</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [formData.duration]: { selected: true, selectedColor: '#FFC300' }
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SabbaticalRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001D3D',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FFC300',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#000',
  },
});