import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import Record from "./Record";
import BP_chart from "./BP_chart";
import LogModal from "./LogModal";
import BP_Log from "./BP_Log";
import ProfileModal from "./ProfileModal";
import GlucoseLevel from "./GlucoseLevel";
import SugarChart from "./SugarChart";
import Personal from "./Personal";
import MedicalHistory from "./MedicalHistory";
import ConsumptionModal from "./ConsumptionModal";

const PatientProfile = ({ responseData }) => {
  const [record, setRecord] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [consumptionModal, setConsumptionModal] = useState(false);

  const [bmi, setBmi] = useState(0);
  const [bmiColor, setBmiColor] = useState("");

  const { first_name, last_name, height, weight } =
    responseData || {};

  /* ---------------- BMI Calculation ---------------- */
  useEffect(() => {
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);

    setBmi(bmiValue);

    if (bmiValue < 18.5) setBmiColor("bg-purple-400");
    else if (bmiValue < 24.9) setBmiColor("bg-blue-400");
    else if (bmiValue < 29.9) setBmiColor("bg-orange-400");
    else setBmiColor("bg-red-500");
  }, [height, weight]);

  if (!responseData || responseData.new_patient) return null;

  if (Object.keys(responseData).length === 0)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="w-full flex flex-wrap justify-center gap-4">

        {/* Sidebar */}
        <div className="bg-gray-800 w-full sm:w-1/5 p-2 rounded-lg">
          <Sidebar
            setRecord={setRecord}
            setLogModal={setLogModal}
            setProfileModal={setProfileModal}
            setConsumptionModal={setConsumptionModal}
          />
        </div>

        {/* Main Content */}
        <div className="w-full sm:w-4/5 flex flex-col gap-4">

          {/* Greeting + BMI */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
            <div>
              <p className="text-xl font-semibold">
                Hi, {first_name} {last_name}
              </p>
              <p className="text-gray-600">Check your health!</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-semibold">BMI</p>
              <div
                className={`w-14 h-12 flex items-center justify-center text-white rounded-lg ${bmiColor}`}
              >
                {bmi ? bmi.toFixed(1) : "--"}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-2 shadow">
              <BP_chart chartData={responseData.bp_log} />
            </div>

            <div className="bg-white rounded-lg p-2 shadow">
              <SugarChart chartData={responseData.blood_glucose} />
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-lg p-4 shadow">
            <Personal responseData={responseData} />
          </div>

          {/* Calendar + Medical History */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <Calendar />
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <MedicalHistory
                data={responseData.medical_history}
              />
            </div>
          </div>

          {/* Logs */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="font-semibold mb-2">
                Glucose
              </h2>
              <GlucoseLevel responseData={responseData} />
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <h2 className="font-semibold mb-2">
                Blood Pressure
              </h2>
              <BP_Log responseData={responseData} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Record setRecord={setRecord} record={record} />
      <LogModal setLogModal={setLogModal} logModal={logModal} />
      <ProfileModal
        setProfileModal={setProfileModal}
        profileModal={profileModal}
      />
      <ConsumptionModal
        consumptionModal={consumptionModal}
        setConsumptionModal={setConsumptionModal}
      />
    </div>
  );
};

export default PatientProfile;
