import React, { createContext, useState } from "react";
import requestsData from "../data/requests"; // Initial data

export const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState(requestsData);

  const updateRequest = (updatedRequest) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === updatedRequest.id ? updatedRequest : req
      )
    );
  };

  return (
    <RequestsContext.Provider value={{ requests, updateRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};

