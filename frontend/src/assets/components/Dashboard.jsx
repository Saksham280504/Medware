import React, { useEffect } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import PatientProfile from "./PatientProfile";
import { useGlobalContext } from "./context";

// CSRF configuration for Django backend
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Dashboard = () => {
  const {
    handleInputChange,
    formData,
    handleFormSubmit,
    data,
    fetchData,
  } = useGlobalContext();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-24 px-4 bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-50 min-h-screen">
      <div className="animate-fade-in-down" style={{animationDelay: "0.1s"}}>
        <PatientForm
          profileData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          patientData={data}
        />
      </div>

      <div className="animate-fade-in-up" style={{animationDelay: "0.2s"}}>
        <PatientProfile responseData={data} />
      </div>
    </div>
  );
};

export default Dashboard;
