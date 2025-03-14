import instance from ".";

// ============= GET =============
const getMyRequests = async () => {
  const response = await instance.get("/requests/my-requests");
  return response.data;
};

const getMyProfile = async () => {
  const response = await instance.get("/users/me");
  return response.data;
};

const getMyCredits = async () => {
  const response = await instance.get("/users/my-credit");
  return response.data;
};

// ============= POST ============
const createVacationRequest = async (
  startDate,
  endDate,
  typeOfVacation,
  descriptionBody = "",
  files = []
) => {
  const formData = new FormData();
  formData.append("StartDate", startDate); // YYYY-MM-DD string
  formData.append("EndDate", endDate); // YYYY-MM-DD string
  formData.append("TypeOfVacation", typeOfVacation); // Enum: Annual, Sick, Other
  if (descriptionBody) {
    formData.append("Message.DescriptionBody", descriptionBody); // Optional message body
  }
  files.forEach((file) => {
    formData.append("Message.Files", file); // Optional array of files
  });
  const response = await instance.post("/requests/vacation", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // Returns { RequestId: int }
};

const createComplaintRequest = async (
  typeOfComplaint,
  descriptionBody = "",
  files = []
) => {
  const formData = new FormData();
  formData.append("TypeOfComplaint", typeOfComplaint); // Enum: WorkplaceSafety, HarassmentAndDiscrimination, Other
  if (descriptionBody) {
    formData.append("Message.DescriptionBody", descriptionBody); // Optional message body
  }
  files.forEach((file) => {
    formData.append("Message.Files", file); // Optional array of files
  });
  const response = await instance.post("/requests/complaint", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // Returns { RequestId: int }
};

const addMessageToRequest = async (
  requestId,
  descriptionBody = "",
  files = []
) => {
  const formData = new FormData();
  formData.append("RequestId", requestId); // Integer ID of the request
  if (descriptionBody) {
    formData.append("DescriptionBody", descriptionBody); // Optional message body
  }
  files.forEach((file) => {
    formData.append("Files", file); // Optional array of files
  });
  const response = await instance.post("/requests/add-message", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // Returns {}
};

export {
  // GET Endpoints
  getMyRequests,
  getMyProfile,
  getMyCredits,
  // POST Endpoints
  createVacationRequest,
  createComplaintRequest,
  addMessageToRequest,
};
