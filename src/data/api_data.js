const api_data = [
  {
    ApiVersion: "1.0",
    BaseUrl: "http://localhost:7119/api",
    Authentication: {
      Type: "JWT Bearer Token",
      Header: "Authorization: Bearer <token>",
      Roles: ["Employee", "Admin"],
    },
    Endpoints: [
      {
        Path: "/auth/login",
        Method: "POST",
        Description:
          "Authenticate a user and return a JWT token, role, and user ID",
        Request: {
          ContentType: "application/json",
          Body: {
            email: "string",
            password: "string",
          },
        },
        Response: {
          Status: 200,
          Body: {
            token: "string",
            role: "string",
            userId: "string",
          },
        },
        Errors: [
          {
            Status: 400,
            Description: "Invalid email or password",
          },
        ],
      },
      {
        Path: "/requests/vacation",
        Method: "POST",
        Description: "Create a vacation request (Employee only)",
        Roles: ["Employee"],
        Request: {
          ContentType: "multipart/form-data",
          Body: {
            StartDate: "string (YYYY-MM-DD)",
            EndDate: "string (YYYY-MM-DD)",
            TypeOfVacation: "string (enum: Annual, Sick, Other)",
            Message: {
              DescriptionBody: "string (optional)",
              Files: "array of files (optional, e.g., PDFs, images)",
            },
          },
        },
        Response: {
          Status: 200,
          Body: { RequestId: "int" },
        },
        Errors: [{ Status: 401, Description: "Unauthorized (invalid token)" }],
      },
      {
        Path: "/requests/complaint",
        Method: "POST",
        Description: "Create a complaint request (Employee only)",
        Roles: ["Employee"],
        Request: {
          ContentType: "multipart/form-data",
          Body: {
            TypeOfComplaint:
              "string (enum: WorkplaceSafety, HarassmentAndDiscrimination, Other)",
            Message: {
              DescriptionBody: "string (optional)",
              Files: "array of files (optional)",
            },
          },
        },
        Response: {
          Status: 200,
          Body: { RequestId: "int" },
        },
        Errors: [{ Status: 401, Description: "Unauthorized" }],
      },
      {
        Path: "/requests/respond",
        Method: "POST",
        Description: "Admin responds to a request",
        Roles: ["Admin"],
        Request: {
          ContentType: "multipart/form-data",
          Body: {
            RequestId: "int",
            Status: "string (e.g., Approved, Rejected, RequestingDocuments)",
            Message: {
              DescriptionBody: "string (optional)",
              Files: "array of files (optional)",
            },
          },
        },
        Response: { Status: 200, Body: "{}" },
        Errors: [
          { Status: 401, Description: "Unauthorized" },
          { Status: 403, Description: "Forbidden (non-admin)" },
          { Status: 404, Description: "Request not found" },
        ],
      },
      {
        Path: "/requests/add-message",
        Method: "POST",
        Description: "Add a message to an existing request (Employee only)",
        Roles: ["Employee"],
        Request: {
          ContentType: "multipart/form-data",
          Body: {
            RequestId: "int",
            DescriptionBody: "string (optional)",
            Files: "array of files (optional)",
          },
        },
        Response: { Status: 200, Body: "{}" },
        Errors: [
          { Status: 401, Description: "Unauthorized" },
          { Status: 403, Description: "Forbidden (not owner)" },
          { Status: 404, Description: "Request not found" },
        ],
      },
      {
        Path: "/requests/my-requests",
        Method: "GET",
        Description: "Get all requests for the logged-in employee",
        Roles: ["Employee"],
        Request: { ContentType: "none" },
        Response: {
          Status: 200,
          Body: "array of Request objects (see DTOs)",
        },
        Errors: [{ Status: 401, Description: "Unauthorized" }],
      },
      {
        Path: "/requests/all-requests",
        Method: "GET",
        Description: "Get all requests (Admin only)",
        Roles: ["Admin"],
        Request: { ContentType: "none" },
        Response: {
          Status: 200,
          Body: "array of Request objects (see DTOs)",
        },
        Errors: [{ Status: 403, Description: "Forbidden (non-admin)" }],
      },
      {
        Path: "/users/all-employees",
        Method: "GET",
        Description: "Get all employees (Admin only)",
        Roles: ["Admin"],
        Request: { ContentType: "none" },
        Response: {
          Status: 200,
          Body: "array of Employee objects (see DTOs)",
        },
        Errors: [{ Status: 403, Description: "Forbidden (non-admin)" }],
      },
      {
        Path: "/users/me",
        Method: "GET",
        Description:
          "Get profile details of the logged-in user (Employee or Admin)",
        Roles: ["Employee", "Admin"],
        Request: { ContentType: "none" },
        Response: {
          Status: 200,
          Body: "User object (see DTOs)",
        },
        Errors: [{ Status: 401, Description: "Unauthorized" }],
      },
      {
        Path: "/users/employee/{employeeId}",
        Method: "GET",
        Description: "Get employee details with requests (Admin only)",
        Roles: ["Admin"],
        Request: { Parameters: { employeeId: "string" } },
        Response: {
          Status: 200,
          Body: "Employee object with requests (see DTOs)",
        },
        Errors: [
          { Status: 403, Description: "Forbidden (non-admin)" },
          { Status: 404, Description: "Employee not found" },
        ],
      },
      {
        Path: "/users/my-credit",
        Method: "GET",
        Description: "Get vacation/sick day credits (Employee only)",
        Roles: ["Employee"],
        Request: { ContentType: "none" },
        Response: {
          Status: 200,
          Body: { VacationDays: "float", SickDays: "int", IsVacation: "bool" },
        },
        Errors: [{ Status: 401, Description: "Unauthorized" }],
      },
    ],
    DTOs: {
      UserResponseDTO: {
        Id: "string",
        FirstName: "string",
        MiddleName: "string (nullable)",
        LastName: "string",
        Email: "string",
        ProfilePicture: "string (nullable)",
        Role: "string",
        Position: "string (nullable, enum: Manager, SeniorOfficer, etc.)",
        VacationDays: "float (nullable)",
        SickDays: "int (nullable)",
        Department: "string (nullable, enum: IT, HR, etc.)",
        Requests: "array of RequestResponseDTO (nullable)",
      },
      RequestResponseDTO: {
        RequestId: "int",
        IsClicked: "bool",
        TypeOfRequest: "string (enum: Vacation, Complaint)",
        CreatedAt: "string (ISO 8601)",
        EmployeeId: "string",
        StartDate: "string (nullable, YYYY-MM-DD)",
        EndDate: "string (nullable, YYYY-MM-DD)",
        RequestStatus: "string (nullable, enum: Ongoing, Approved, etc.)",
        TypeOfVacation: "string (nullable, enum: Annual, Sick, etc.)",
        ComplaintStatus: "string (nullable, enum: Ongoing, Resolved, etc.)",
        TypeOfComplaint: "string (nullable, enum: WorkplaceSafety, etc.)",
        Messages: "array of MessageResponseDTO",
      },
      MessageResponseDTO: {
        MessageId: "int",
        CreatedAt: "string (ISO 8601)",
        DescriptionBody: "string (nullable)",
        UserId: "string",
        RequestId: "int",
        Files: "array of MessageFileResponseDTO",
      },
      MessageFileResponseDTO: {
        MessageFileId: "int",
        FileName: "string",
        FilePath: "string",
        FileType: "string (e.g., application/pdf)",
        MessageId: "int",
      },
    },
  },
];

export default api_data;
