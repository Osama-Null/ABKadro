const files = [
    {
      "requestId": 1,
      "isClicked": false,
      "typeOfRequest": 0,
      "createdAt": "2025-03-10T20:28:40.9099495",
      "employeeId": "emp1",
      "startDate": "2025-04-01T00:00:00",
      "endDate": "2025-04-07T00:00:00",
      "requestStatus": 0,
      "typeOfVacation": 0,
      "complaintStatus": null,
      "typeOfComplaint": null,
      "messages": [
          {
              "messageId": 1,
              "createdAt": "2025-03-10T20:28:40.9101526",
              "descriptionBody": "Requesting a week off for a family vacation.",
              "userId": "emp1",
              "requestId": 1,
              "files": [
                  {
                      "messageFileId": 1,
                      "fileName": "vacation-request.png",
                      "filePath": "https://picsum.photos/200/300",
                      "fileType": "image/png",
                      "messageId": 1
                  }
              ]
          }
      ]
    },
    {
      "requestId": 2,
      "isClicked": false,
      "typeOfRequest": 1,
      "createdAt": "2025-03-11T15:15:22.5094821",
      "employeeId": "emp2",
      "startDate": null,
      "endDate": null,
      "requestStatus": 1,
      "typeOfVacation": null,
      "complaintStatus": 1,
      "typeOfComplaint": 2,
      "messages": [
          {
              "messageId": 2,
              "createdAt": "2025-03-11T15:16:00.1234567",
              "descriptionBody": "Raising a concern about workplace harassment.",
              "userId": "emp2",
              "requestId": 2,
              "files": [
                  {
                      "messageFileId": 2,
                      "fileName": "complaint-evidence.png",
                      "filePath": "https://picsum.photos/200/300?random=1",
                      "fileType": "image/png",
                      "messageId": 2
                  }
              ]
          }
      ]
    },
    {
      "requestId": 3,
      "isClicked": false,
      "typeOfRequest": 0,
      "createdAt": "2025-03-12T09:45:10.7891234",
      "employeeId": "emp3",
      "startDate": "2025-05-10T00:00:00",
      "endDate": "2025-05-15T00:00:00",
      "requestStatus": 2,
      "typeOfVacation": 1,
      "complaintStatus": null,
      "typeOfComplaint": null,
      "messages": [
          {
              "messageId": 3,
              "createdAt": "2025-03-12T09:46:30.6543210",
              "descriptionBody": "Medical leave request due to surgery recovery.",
              "userId": "emp3",
              "requestId": 3,
              "files": [
                  {
                      "messageFileId": 3,
                      "fileName": "medical-leave-doc.png",
                      "filePath": "https://picsum.photos/200/300?random=2",
                      "fileType": "image/png",
                      "messageId": 3
                  }
              ]
          }
      ]
    }
  ];
  
  export default files;
  