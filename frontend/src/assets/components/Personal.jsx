import React from "react";

const Personal = ({ responseData }) => {
  if (!responseData) return null;

  const {
    age,
    sex,
    height,
    weight,
    diet,
    exercise,
    dob_day,
    dob_month,
    dob_year,
    smoke_cons,
    alcohol_cons,
    current_med,
  } = responseData;

  return (
    <div className="px-6 py-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-2xl md:text-3xl text-gray-800 font-semibold mb-6">
        Personal Info
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
        
        <InfoItem label="Age" value={age} />
        <InfoItem label="Sex" value={sex} />

        {height && <InfoItem label="Height (cm)" value={height} />}
        {weight && <InfoItem label="Weight (kg)" value={weight} />}

        <InfoItem
          label="Date of Birth"
          value={`${dob_day}/${dob_month}/${dob_year}`}
        />

        <InfoItem label="Exercise" value={exercise} />
        <InfoItem label="Diet" value={diet} />
        <InfoItem label="Alcohol Consumption" value={alcohol_cons} />
        <InfoItem label="Smoking Consumption" value={smoke_cons} />

        <InfoItem
          label="Current Medications"
          value={
            Array.isArray(current_med)
              ? current_med.join(", ")
              : current_med || "None"
          }
          fullWidth
        />
      </div>
    </div>
  );
};

/* ---------- Reusable Info Item ---------- */

const InfoItem = ({ label, value, fullWidth }) => (
  <div
    className={`border p-3 rounded-lg bg-gray-50 ${
      fullWidth ? "sm:col-span-2" : ""
    }`}
  >
    <div className="text-gray-600 font-medium">{label}:</div>
    <div className="text-gray-900">{value || "--"}</div>
  </div>
);

export default Personal;
