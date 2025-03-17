import instance from ".";

// ============= GET Requests =============
/**
 * Fetches all requests (Admin only).
 * @returns {Promise<Array>} Array of Request objects.
 */
const getAllRequests = async () => {
  const response = await instance.get("/requests/all-requests");
  return response.data;
};

/**
 * Fetches all employees (Admin only).
 * @returns {Promise<Array>} Array of Employee objects.
 */
const getAllEmployees = async () => {
  const response = await instance.get("/users/all-employees");
  return response.data;
};

/**
 * Fetches details of a specific employee, including their requests (Admin only).
 * @param {string} employeeId - The ID of the employee.
 * @returns {Promise<Object>} Employee object with requests.
 */
const getEmployeeDetails = async (employeeId) => {
  const response = await instance.get(`/users/employee/${employeeId}`);
  return response.data;
};

// ============= POST Requests =============
/**
 * Responds to a request (Admin only).
 * @param {number} requestId - The ID of the request.
 * @param {string} status - The status (e.g., "Approved", "Rejected", "RequestingDocuments").
 * @param {string} [descriptionBody=''] - Optional message body.
 * @param {Array<File>} [files=[]] - Optional array of files.
 * @returns {Promise<Object>} Empty object {}.
 */
const respondToRequest = async (
  requestId,
  status,
  descriptionBody = "",
  files = []
) => {
  const formData = new FormData();
  formData.append("RequestId", requestId); // Integer ID of the request
  formData.append("Status", status); // Status string
  if (descriptionBody) {
    formData.append("Message.DescriptionBody", descriptionBody); // Optional message body
  }
  files.forEach((file) => {
    formData.append("Message.Files", file); // Optional files
  });
  const response = await instance.post("/requests/respond", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // Returns {}
};

// Export all functions
export {
  getAllRequests,
  getAllEmployees,
  getEmployeeDetails,
  respondToRequest,
};
