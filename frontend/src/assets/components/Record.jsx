import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import { TextField, Button } from "@mui/material";
import { useGlobalContext } from "./context";

const Record = ({ record, setRecord }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();

  const closeRecord = () => {
    setRecord(false);
  };

  /* -------- Close on outside click -------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeRecord();
      }
    };

    if (record) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [record]);

  if (!record) return null;

  return (
    <div className="modal fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white w-[500px] p-6 rounded-xl shadow-lg relative">

        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button onClick={closeRecord} className="hover:scale-110 transition">
            <img src={crossIcon} alt="close" className="w-5 h-5" />
          </button>
        </div>

        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleDashboardSubmit(e);
            closeRecord();
          }}
        >
          <h1 className="text-2xl p-2 font-semibold text-gray-700 text-center">
            Update Your Medical Info
          </h1>

          <TextField
            name="current_med"
            label="Current Medications"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            helperText="Separate values by commas"
            onChange={handleDashboardChange}
            value={data.current_med || ""}
          />

          <TextField
            name="medical_history"
            label="Medical History"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            helperText="Separate values by commas"
            onChange={handleDashboardChange}
            value={data.medical_history || ""}
          />

          <div className="flex justify-center mt-4">
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Record;
