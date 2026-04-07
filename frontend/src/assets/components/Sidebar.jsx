import React from "react";
import recordIcon from "../img/record.svg";
import profileIcon from "../img/profile.svg";
import settingsIcon from "../img/settings.svg";
import consumptionIcon from "../img/cons.svg";

const Sidebar = ({
  setRecord,
  setLogModal,
  setProfileModal,
  setConsumptionModal,
}) => {
  return (
    <div className="flex sm:flex-col gap-4 justify-center items-center bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">

      <button
        onClick={() => setProfileModal(true)}
        className="w-12 h-12 p-2.5 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 transition-all duration-300 transform active:scale-95 group"
      >
        <img src={profileIcon} alt="Profile" className="w-full filter brightness-0 invert" />
      </button>

      <button
        onClick={() => setRecord(true)}
        className="w-12 h-12 p-2.5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg hover:scale-110 hover:shadow-lg hover:shadow-purple-400/50 transition-all duration-300 transform active:scale-95 group"
      >
        <img src={recordIcon} alt="Medical Record" className="w-full filter brightness-0 invert" />
      </button>

      <button
        onClick={() => setLogModal(true)}
        className="w-12 h-12 p-2.5 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg hover:scale-110 hover:shadow-lg hover:shadow-orange-400/50 transition-all duration-300 transform active:scale-95 group"
      >
        <img src={settingsIcon} alt="Settings" className="w-full filter brightness-0 invert" />
      </button>

      <button
        onClick={() => setConsumptionModal(true)}
        className="w-12 h-12 p-2.5 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg hover:scale-110 hover:shadow-lg hover:shadow-green-400/50 transition-all duration-300 transform active:scale-95 group"
      >
        <img src={consumptionIcon} alt="Consumption" className="w-full filter brightness-0 invert" />
      </button>

    </div>
  );
};

export default Sidebar;
