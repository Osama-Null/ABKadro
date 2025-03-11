// data/requests.js
const requests = [
  {
    id: 1,
    employeeId: 1, // Links to John Russo in employees.js
    type: "Leave",
    status: "Pending",
    submittedDate: "2025-03-15",
    details: "Vacation from 2025-04-01 to 2025-04-05",
    hrReviewerId: 5, // Links to Priya Sharma (HR Specialist)
    reviewedDate: null,
    comments: null,
  },
  {
    id: 2,
    employeeId: 2, // Links to Li Mei Chen
    type: "Expense",
    status: "Approved",
    submittedDate: "2025-03-10",
    details: "Conference travel: $500",
    hrReviewerId: 6, // Links to David Kim (HR Manager)
    reviewedDate: "2025-03-11",
    comments: "Approved with receipt verification",
  },
  {
    id: 3,
    employeeId: 3, // Links to Carlos Martinez
    type: "Training",
    status: "Rejected",
    submittedDate: "2025-03-12",
    details: "Sales workshop: $300",
    hrReviewerId: 8, // Links to Marcus Johnson (Director of HR)
    reviewedDate: "2025-03-13",
    comments: "Budget constraints",
  },
];

export default requests;