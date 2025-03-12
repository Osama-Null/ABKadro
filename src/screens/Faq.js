import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FaqItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity 
        style={styles.questionContainer}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Text style={styles.expandIcon}>{isExpanded ? '-' : '+'}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: "What is this app for?",
      answer: "This app helps employees manage leave requests, sabbaticals, and complaints. It also allows HR to review and respond to requests efficiently."
    },
    {
      question: "How do I apply for leave?",
      answer: "Press the Services button shown on the navigation bar below, select Sabbatical Request, enter the requested information, and submit your request. You will be able to check the status of your request once HR reviews it."
    },
    {
      question: "What types of leaves are available?",
      answer: "The app supports different leave types such as Annual ( 30 days ), Sick ( 15 days ), Hajj ( 21 days ), Education ( 15 days ), HaLfDay ( 5 hours ), Hospitalization ( per medical examination ), Maternity ( 6 months ), Paternity ( 3 days ), PatientCompanion ( first relative ), TreatmentAbroad, Marriage ( 3 days ), Bereavement ( 3 days Kuwait. 5 days abroad. ). "
    },
    {
      question: "How long does it take for my leave request to be approved?",
      answer: "Approval times depend on your department and HR processing. You can track the status in the app."
    },
    {
      question: "What happens if my leave request is rejected?",
      answer: "If rejected, you will see Rejected on your request with the reason. You can modify and resubmit the request if needed."
    },
    {
      question: "How do I file a complaint?",
      answer: "Press the Services button shown on the navigation bar below, select Complaint Request, enter the requested information, and submit your request. You will be able to check the status of your request once HR reviews it"
    },
    {
      question: "How do I check my remaining leave balance?",
      answer: "Your available leave balance is displayed in the Home screen and the Sabbatical Request screen."
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Frequently Asked Questions</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {faqData.map((faq, index) => (
          <FaqItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Faq;

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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  faqItem: {
    marginBottom: 16,
    backgroundColor: "#003566",
    borderRadius: 8,
    overflow: "hidden",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    flex: 1,
  },
  expandIcon: {
    fontSize: 20,
    color: "#FFF",
    marginLeft: 8,
  },
  answerContainer: {
    padding: 16,
    backgroundColor: "#004B8F",
  },
  answerText: {
    fontSize: 14,
    color: "#FFF",
    lineHeight: 20,
  },
});
