import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DoctorProfile from "./DoctorProfile";
import SkeletonLoader from "./SkeletonLoader";
import { Autocomplete, TextField } from "@mui/material";
import API_BASE_URL from "../../config";

const docOptions = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrician",
  "Gynecologist",
  "Cardiologist",
  "Oncologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Infectious disease",
  "Nephrologist",
  "Endocrinologist",
  "Ophthalmologist",
  "Otolaryngologist",
  "Dermatologist",
  "Psychiatrist",
  "Neurologist",
  "Radiologist",
  "Anesthesiologist",
  "Surgeon",
  "Physician executive",
];

const ContactDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [speciality, setSpeciality] = useState(null);
  const [loading, setLoading] = useState(false);

  const doctorType = useRef("All");

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/doctor/${doctorType.current}`
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDocChange = () => {
    if (!speciality || !docOptions.includes(speciality)) {
      alert("Please select a valid speciality");
      return;
    }

    doctorType.current = speciality;
    fetchDoctors();
  };

  return (
    <section className="w-full flex flex-col items-center py-10 px-4 bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-50 min-h-screen">

      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in-down" style={{animationDelay: "0.1s"}}>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
          Find Healthcare Professionals
        </h1>
        <p className="text-slate-600 text-lg">
          Search and connect with experienced doctors in your speciality
        </p>
      </div>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row w-full max-w-3xl justify-center gap-4 items-center mb-8 animate-fade-in-up" style={{animationDelay: "0.15s"}}>
        <div className="w-full bg-white rounded-lg border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <Autocomplete
            options={docOptions}
            value={speciality}
            onChange={(e, newValue) => setSpeciality(newValue)}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a speciality..."
                variant="outlined"
                color="primary"
              />
            )}
          />
        </div>

        <button
          onClick={handleDocChange}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 md:w-auto whitespace-nowrap"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-slate-300 my-8 w-full max-w-4xl opacity-50"></div>

      {/* Results Section */}
      <div className="flex justify-center w-full">
        {loading ? (
          <div className="animate-fade-in">
            <SkeletonLoader />
          </div>
        ) : doctors.length > 0 ? (
          <div className="animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            <DoctorProfile doctors={doctors} />
          </div>
        ) : (
          <div className="text-slate-600 italic text-lg py-12 animate-fade-in">
            No doctors found for this speciality. Try another speciality!
          </div>
        )}
      </div>

      <article id="info-contact-doctor"></article>
    </section>
  );
};

export default ContactDoctor;
