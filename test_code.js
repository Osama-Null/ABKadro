import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const test = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  // Handle date range selection and update remaining credits live
  const handleDateRangeSelect = (day) => {
    if (!formData.startDate || (formData.startDate && formData.endDate)) {
      // Start a new range
      setFormData({ ...formData, startDate: day.dateString, endDate: "" });
      setRemainingCredits(vacationCredits); // Reset remaining credits
    } else if (formData.startDate && !formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(day.dateString);
      if (start > end) {
        setError("End Date must be after Start Date.");
        return;
      }
      setFormData({ ...formData, endDate: day.dateString });
      const requestedDays =
        Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setRemainingCredits(vacationCredits - requestedDays); // Update live
    }
  };

  // Mark the selected range for the calendar
  const markedDates = {};
  if (formData.startDate) {
    markedDates[formData.startDate] = {
      startingDay: true,
      color: "#FFC300",
      textColor: "#000",
    };
  }
  if (formData.endDate) {
    markedDates[formData.endDate] = {
      endingDay: true,
      color: "#FFC300",
      textColor: "#000",
    };
  }
  if (formData.startDate && formData.endDate) {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    let current = new Date(start);
    while (current <= end) {
      const dateString = current.toISOString().split("T")[0];
      if (!markedDates[dateString]) {
        markedDates[dateString] = { color: "#FFC300", textColor: "#000" };
      }
      current.setDate(current.getDate() + 1);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {formData.startDate && formData.endDate
                ? `${formData.startDate} to ${formData.endDate}`
                : "Select Date Range"}
            </Text>
            <MaterialCommunityIcons name="calendar" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Calendar Modal for Date Range */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date Range</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={handleDateRangeSelect}
              markingType={"period"}
              markedDates={markedDates}
              enableSwipeMonths={true}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001D3D",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
