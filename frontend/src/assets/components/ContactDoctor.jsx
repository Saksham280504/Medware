import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DoctorProfile from "./DoctorProfile";
import SkeletonLoader from "./SkeletonLoader";
import { Autocomplete, TextField } from "@mui/material";

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
        `http://127.0.0.1:8000/doctor/${doctorType.current}`
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
    <section className="w-full flex flex-col items-center py-10 px-4">

      {/* Search Section */}
      <div className="flex flex-col md:flex-row w-full max-w-3xl justify-center gap-4 items-center">
        <Autocomplete
          options={docOptions}
          value={speciality}
          onChange={(e, newValue) => setSpeciality(newValue)}
          className="w-full bg-white rounded-md"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a speciality..."
              variant="outlined"
              color="primary"
            />
          )}
        />

        <button
          onClick={handleDocChange}
          disabled={loading}
          className="w-28 bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700 transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8 w-4/5"></div>

      {/* Results Section */}
      <div className="flex justify-center w-full">
        {loading ? (
          <SkeletonLoader />
        ) : doctors.length > 0 ? (
          <DoctorProfile doctors={doctors} />
        ) : (
          <p className="text-gray-500 italic">
            No doctors found for this speciality.
          </p>
        )}
      </div>

      <article id="info-contact-doctor"></article>
    </section>
  );
};

export default ContactDoctor;
