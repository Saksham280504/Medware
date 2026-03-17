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
    <div className="flex sm:flex-col gap-6 justify-center items-center bg-white p-4 rounded-xl shadow-md">

      <button
        onClick={() => setProfileModal(true)}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer transition"
      >
        <img src={profileIcon} alt="Profile" className="w-full" />
      </button>

      <button
        onClick={() => setRecord(true)}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer transition"
      >
        <img src={recordIcon} alt="Medical Record" className="w-full" />
      </button>

      <button
        onClick={() => setLogModal(true)}
        className="w-10 h-10 p-1.5 hover:scale-90 hover:cursor-pointer transition"
      >
        <img src={settingsIcon} alt="Settings" className="w-full" />
      </button>

      <button
        onClick={() => setConsumptionModal(true)}
        className="w-9 h-9 p-1 hover:scale-90 hover:cursor-pointer transition"
      >
        <img src={consumptionIcon} alt="Consumption" className="w-full" />
      </button>

    </div>
  );
};

export default Sidebar;
