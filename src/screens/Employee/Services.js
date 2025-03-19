import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import { typeOfVacationMap, complaintTypeMap } from "../../constants/enums";
import {
  createVacationRequest,
  createComplaintRequest,
} from "../../api/employees";
import Entypo from "@expo/vector-icons/Entypo";

const Services = () => {
  const pickFile = async () => {
    console.log("Picking file...");
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    console.log("Result:", result);
  };

  const navigation = useNavigation();

  // State management
  const [requestType, setRequestType] = useState("");
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    typeOfVacation: "",
    typeOfComplaint: "",
    description: "",
    files: [],
  });
  const [showRequestDropdown, setShowRequestDropdown] = useState(false);
  const [showVacationDropdown, setShowVacationDropdown] = useState(false);
  const [showComplaintDropdown, setShowComplaintDropdown] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Mutations for API POST requests
  const leaveMutation = useMutation({
    mutationFn: ({
      startDate,
      endDate,
      typeOfVacation,
      descriptionBody,
      files,
    }) =>
      createVacationRequest(
        startDate,
        endDate,
        typeOfVacation,
        descriptionBody,
        files
      ),
    onSuccess: (data) => {
      console.log("Leave request submitted successfully:", data);
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error submitting leave request:", error);
      alert(
        "Failed to submit leave request: " +
          (error.message || "Something went wrong")
      );
    },
  });

  const complaintMutation = useMutation({
    mutationFn: ({ typeOfComplaint, descriptionBody, files }) =>
      createComplaintRequest(typeOfComplaint, descriptionBody, files),
    onSuccess: (data) => {
      console.log("Complaint request submitted successfully:", data);
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Error submitting complaint request:", error);
      alert(
        "Failed to submit complaint request: " +
          (error.message || "Something went wrong")
      );
    },
  });

  // Handlers
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRequestTypeSelect = (type) => {
    setRequestType(type);
    setShowRequestDropdown(false);
  };

  const handleVacationTypeSelect = (type) => {
    handleInputChange("typeOfVacation", type);
    setShowVacationDropdown(false);
  };

  const handleComplaintTypeSelect = (type) => {
    handleInputChange("typeOfComplaint", type);
    setShowComplaintDropdown(false);
  };

  // File selection handler
  const handleFileSelect = async () => {
    console.log("Button tapped!");
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });
      console.log("DocumentPicker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          type: result.assets[0].mimeType || "application/octet-stream",
        };
        setFormData((prevFormData) => ({
          ...prevFormData,
          files: [...prevFormData.files, file],
        }));
      }
    } catch (error) {
      console.error("Error selecting file:", error);
      alert("Failed to select file");
    }
  };

  useEffect(() => {
    console.log("formData.files updated:", formData.files);
  }, [formData.files]);

  const handleRemoveFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
  };

  const handleDateSelect = (day) => {
    const { dateString } = day;
    if (!formData.startDate || (formData.startDate && formData.endDate)) {
      setFormData({ ...formData, startDate: dateString, endDate: "" });
    } else if (formData.startDate && !formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(dateString);
      if (start > end) {
        alert("End Date must be after Start Date.");
        return;
      }
      setFormData({ ...formData, endDate: dateString });
    }
  };

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

  // Form submission handler
  const handleSubmit = () => {
    console.log("Submitting with formData:", formData);
    if (!requestType) {
      alert("Please select a request type");
      return;
    }
    if (requestType === "Leave") {
      if (
        !formData.startDate ||
        !formData.endDate ||
        !formData.typeOfVacation
      ) {
        alert(
          "Please fill all required fields: Start Date, End Date, and Type of Vacation"
        );
        return;
      }
      const typeOfVacationIndex = Object.entries(typeOfVacationMap).find(
        ([key, value]) => value === formData.typeOfVacation
      )[0];
      leaveMutation.mutate({
        startDate: formData.startDate,
        endDate: formData.endDate,
        typeOfVacation: typeOfVacationIndex,
        descriptionBody: formData.description,
        files: formData.files,
      });
    } else if (requestType === "Complaint") {
      if (!formData.typeOfComplaint) {
        alert("Please select a Type of Complaint");
        return;
      }
      complaintMutation.mutate({
        typeOfComplaint: formData.typeOfComplaint,
        descriptionBody: formData.description,
        files: formData.files,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Request Apply</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        {/* Request Type Dropdown */}
        <View style={styles.fieldContainer}>
          <TouchableOpacity onPress={pickFile}>
            <Text>Pick a File</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Request Type</Text>
          <BlurView intensity={50} style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowRequestDropdown(!showRequestDropdown)}
            >
              <Text style={styles.dropdownText}>
                {requestType || "Select Request Type"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="white" />
            </TouchableOpacity>
          </BlurView>
          {showRequestDropdown && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleRequestTypeSelect("Leave")}
              >
                <Text style={styles.dropdownItemText}>Leave</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleRequestTypeSelect("Complaint")}
              >
                <Text style={styles.dropdownItemText}>Complaint</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* Conditional Fields for Leave */}
        {requestType === "Leave" && (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Select Date Range</Text>

              <BlurView intensity={50} style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowCalendarModal(true)}
                >
                  {formData.startDate && formData.endDate ? (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                        }}
                      >
                        {formData.startDate}
                      </Text>
                      <View
                        style={{
                          transform: [{ rotate: "90deg" }],
                          width: 25,
                          height: 25,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Entypo name="flow-line" size={24} color="gold" />
                      </View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                        }}
                      >
                        {formData.endDate}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.dateRangeButtonText}>
                      Select Date Range
                    </Text>
                  )}
                  <MaterialCommunityIcons
                    name="calendar"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </BlurView>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Type of Vacation</Text>
              <BlurView intensity={50} style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowVacationDropdown(!showVacationDropdown)}
                >
                  <Text style={styles.dropdownText}>
                    {formData.typeOfVacation || "Select Type"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="white" />
                </TouchableOpacity>
              </BlurView>
              {showVacationDropdown && (
                <View style={styles.dropdownMenu}>
                  {Object.values(typeOfVacationMap).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={styles.dropdownItem}
                      onPress={() => handleVacationTypeSelect(type)}
                    >
                      <Text style={styles.dropdownItemText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </>
        )}
        {/* Conditional Fields for Complaint */}
        {requestType === "Complaint" && (
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Type of Complaint</Text>
            <BlurView intensity={50} style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowComplaintDropdown(!showComplaintDropdown)}
              >
                <Text style={styles.dropdownText}>
                  {formData.typeOfComplaint || "Select Type"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="white" />
              </TouchableOpacity>
            </BlurView>
            {showComplaintDropdown && (
              <View style={styles.dropdownMenu}>
                {Object.values(complaintTypeMap).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.dropdownItem}
                    onPress={() => handleComplaintTypeSelect(type)}
                  >
                    <Text style={styles.dropdownItemText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
        {/* Common Fields */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Optional description"
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
            multiline
          />
        </View>

        {/* JSX for file upload */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Attach Files</Text>
          <BlurView intensity={50} style={styles.fileUploadContainer}>
            <TouchableOpacity
              style={styles.fileUpload}
              onPress={handleFileSelect}
            >
              <Text style={styles.fileUploadText}>
                Upload Files ({formData.files.length} selected)
              </Text>
            </TouchableOpacity>
          </BlurView>
          {formData.files.length > 0 && (
            <View style={styles.selectedFilesContainer}>
              <Text style={styles.selectedFilesLabel}>Selected Files:</Text>
              {formData.files.map((file, index) => (
                <View key={index} style={styles.fileItem}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                    <Ionicons name="close" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
        <Modal
          visible={showCalendarModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCalendarModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Date Range</Text>
                <TouchableOpacity onPress={() => setShowCalendarModal(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <Calendar
                onDayPress={handleDateSelect}
                markingType={"period"}
                markedDates={markedDates}
                enableSwipeMonths={true}
              />
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={leaveMutation.isLoading || complaintMutation.isLoading}
        >
          <Text style={styles.submitText}>
            {leaveMutation.isLoading || complaintMutation.isLoading
              ? "Submitting..."
              : "Submit Request"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

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
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  dropdownContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  dropdownText: {
    color: "white",
    fontSize: 16,
  },
  dropdownMenu: {
    backgroundColor: "#0F4277",
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: "white",
    fontSize: 16,
  },
  fileUploadContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  fileUpload: {
    padding: 10,
    alignItems: "center",
  },
  fileUploadText: {
    color: "white",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "gold",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  submitText: {
    color: "#001D3D",
    fontSize: 18,
    fontWeight: "bold",
  },
  dateRangeButton: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateRangeButtonText: {
    fontSize: 16,
    color: "white",
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
  selectedFilesContainer: {
    marginTop: 10,
  },
  selectedFilesLabel: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#0F4277",
    borderRadius: 5,
    marginBottom: 5,
  },
  fileName: {
    color: "white",
    fontSize: 14,
    flex: 1,
  },
});

export default Services;
