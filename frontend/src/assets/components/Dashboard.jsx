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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-50">
      {/* Main Content */}
      <main className="flex-1">
        <div className="pt-32 pb-16 px-4 md:px-6">
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
      </main>
    </div>
  );
};

export default Dashboard;
