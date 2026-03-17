import React, { useEffect, useRef, useState } from "react";
import crossIcon from "../img/cross icon.svg";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useGlobalContext } from "./context";

const LogModal = ({ logModal, setLogModal }) => {
  const { fetchData, url, data, setData } = useGlobalContext();

  const afterRef = useRef();
  const beforeRef = useRef();
  const highRef = useRef();
  const lowRef = useRef();

  const [dateString, setDateString] = useState("");

  // Generate formatted date
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2);
    const month = currentDate.toLocaleString("default", { month: "short" });
    const day = currentDate.getDate();
    setDateString(`${day} ${month} '${year}`);
  }, []);

  const closeLogModal = () => {
    setLogModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const highValue = highRef.current?.value;
    const lowValue = lowRef.current?.value;
    const beforeValue = beforeRef.current?.value;
    const afterValue = afterRef.current?.value;

    // Create deep copy safely
    const updatedData = {
      ...data,
      bp_log: {
        high: [...(data?.bp_log?.high || [])],
        low: [...(data?.bp_log?.low || [])],
        date: [...(data?.bp_log?.date || [])],
      },
      blood_glucose: {
        before: [...(data?.blood_glucose?.before || [])],
        after: [...(data?.blood_glucose?.after || [])],
        date: [...(data?.blood_glucose?.date || [])],
      },
    };

    // Append BP
    if (highValue && lowValue) {
      updatedData.bp_log.high.push(Number(highValue));
      updatedData.bp_log.low.push(Number(lowValue));
      updatedData.bp_log.date.push(dateString);
    }

    // Append Glucose
    if (beforeValue && afterValue) {
      updatedData.blood_glucose.before.push(Number(beforeValue));
      updatedData.blood_glucose.after.push(Number(afterValue));
      updatedData.blood_glucose.date.push(dateString);
    }

    try {
      await axios.put(url, updatedData, {
        withCredentials: true,
      });

      setData(updatedData);
      await fetchData();
    } catch (error) {
      console.error("Update failed:", error);
    }

    closeLogModal();
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        closeLogModal();
      }
    };

    if (logModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [logModal]);

  if (!logModal) return null;

  return (
    <div className="modal-overlay fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 sm:w-[420px] flex flex-col gap-4">

        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={closeLogModal} className="hover:scale-110 transition">
            <img src={crossIcon} alt="Close" className="w-6" />
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          MEDICAL LOG
        </h1>

        <h2 className="text-lg text-teal-600 font-semibold text-center">
          {dateString}
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {/* Blood Pressure */}
          <h3 className="text-lg font-semibold text-gray-700">
            Blood Pressure
          </h3>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="High"
                inputRef={highRef}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Low"
                inputRef={lowRef}
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Glucose */}
          <h3 className="text-lg font-semibold text-gray-700">
            Glucose Level
          </h3>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Before Breakfast"
                inputRef={beforeRef}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="After Breakfast"
                inputRef={afterRef}
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="success"
            type="submit"
            className="mt-2"
          >
            Add Log
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogModal;
