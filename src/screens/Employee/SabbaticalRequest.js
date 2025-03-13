import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";

const SabbaticalRequest = () => {
  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    additionalNotes: "",
  });

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [vacationCredits, setVacationCredits] = useState(null); // Available credits (e.g., 30)
  const [remainingCredits, setRemainingCredits] = useState(null); // Credits left after selection
  const [error, setError] = useState("");

  const sabbaticalTypes = [
    "Annual Leave",
    "Sick Leave",
    "Half Day Leave",
    "High Education Exams",
    "Hospital Surgery Leave",
    "Patient Companion",
    "Treatment Abroad",
    "Marriage",
    "Maternity Leave",
    "Paternity Leave",
    "Hajj",
    "Bereavement Leave",
  ];

  // Fetch vacation credits on component mount
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7119/api/users/my-credit",
          {
            headers: { Authorization: "Bearer <your-token-here>" }, // Replace with your token
          }
        );
        const credits = response.data.VacationDays; // e.g., 30
        setVacationCredits(credits);
        setRemainingCredits(credits); // Initially, remaining = available
      } catch (err) {
        setError("Failed to fetch vacation credits.");
      }
    };
    fetchCredits();
  }, []);

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, type });
    setShowTypeDropdown(false);
  };

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

  const handleSubmit = async () => {
    if (!formData.type || !formData.startDate || !formData.endDate) {
      setError("Please fill in all required fields.");
      return;
    }

    if (remainingCredits < 0) {
      setError(`You only have ${vacationCredits} vacation days left.`);
      return;
    }

    const requestData = {
      StartDate: formData.startDate,
      EndDate: formData.endDate,
      TypeOfVacation: formData.type,
      Message: {
        DescriptionBody: formData.additionalNotes || "",
        Files: [],
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:7119/api/requests/vacation",
        requestData,
        {
          headers: {
            Authorization: "Bearer <your-token-here>", // Replace with your token
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Request submitted successfully:", response.data);
    } catch (err) {
      setError("Failed to submit request.");
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Absence Request</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Type of Absence</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowTypeDropdown(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {formData.type || "Select Absence Type"}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

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

        {/* Display Vacation Credits */}
        {vacationCredits !== null && (
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>
              Available Credits: {vacationCredits} days
            </Text>
            {remainingCredits !== null && (
              <Text style={styles.creditsText}>
                Remaining Credits:{" "}
                {remainingCredits >= 0 ? remainingCredits : 0} days
              </Text>
            )}
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any additional information"
            placeholderTextColor="#666"
            value={formData.additionalNotes}
            onChangeText={(text) =>
              setFormData({ ...formData, additionalNotes: text })
            }
            multiline
            numberOfLines={4}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
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

export default SabbaticalRequest;

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
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FFC300",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
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
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
  creditsContainer: {
    marginBottom: 20,
  },
  creditsText: {
    color: "#FFF",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});
