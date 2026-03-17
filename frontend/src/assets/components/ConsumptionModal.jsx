import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";
import { useGlobalContext } from "./context";

const ConsumptionModal = ({
  consumptionModal,
  setConsumptionModal,
}) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();

  const closeConsumptionModal = () => {
    setConsumptionModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeConsumptionModal();
      }
    };

    if (consumptionModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, [consumptionModal]);

  if (!consumptionModal) return null;

  return (
    <div className="modal fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">

        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button
            onClick={closeConsumptionModal}
            className="hover:scale-105 transition"
          >
            <img
              src={crossIcon}
              alt="close"
              className="w-5 h-5"
              loading="lazy"
            />
          </button>
        </div>

        {/* Form */}
        <form
          className="w-full flex flex-col gap-6 mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleDashboardSubmit(e);
            closeConsumptionModal();
          }}
        >
          <Grid container spacing={3}>

            <Grid item xs={12}>
              <h1 className="text-2xl font-semibold text-gray-800">
                Consumption Data
              </h1>
            </Grid>

            {/* Smoking */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Smoking Consumption</InputLabel>
                <Select
                  value={data.smoke_cons || ""}
                  onChange={handleDashboardChange}
                  name="smoke_cons"
                  label="Smoking Consumption"
                >
                  <MenuItem value="No Consumption">
                    Non Smoker
                  </MenuItem>
                  <MenuItem value="Mild Smoking">
                    Mild Smoking
                  </MenuItem>
                  <MenuItem value="Oftenly Smokes/ Addiction">
                    Addiction
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Alcohol */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Alcohol Consumption</InputLabel>
                <Select
                  value={data.alcohol_cons || ""}
                  onChange={handleDashboardChange}
                  name="alcohol_cons"
                  label="Alcohol Consumption"
                >
                  <MenuItem value="No Consumption">
                    No Consumption
                  </MenuItem>
                  <MenuItem value="Mild Consumption">
                    Mild Consumption
                  </MenuItem>
                  <MenuItem value="High Consumption">
                    High Consumption
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="success"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConsumptionModal;
