import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useGlobalContext } from "./context";

const ProfileModal = ({ profileModal, setProfileModal }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();

  const closeModal = () => {
    setProfileModal(false);
  };

  /* -------- Close when clicking outside -------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal();
      }
    };

    if (profileModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileModal]);

  if (!profileModal) return null;

  return (
    <div className="modal fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white w-[600px] p-6 rounded-xl shadow-lg relative">

        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button onClick={closeModal} className="hover:scale-110 transition">
            <img src={crossIcon} alt="close" className="w-5 h-5" />
          </button>
        </div>

        <h1 className="text-2xl pb-4 font-semibold text-gray-700">
          Edit Profile
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDashboardSubmit(e);
            closeModal();
          }}
        >
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextField
                name="first_name"
                label="First Name"
                fullWidth
                value={data.first_name || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="last_name"
                label="Last Name"
                fullWidth
                value={data.last_name || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="age"
                label="Age"
                type="number"
                fullWidth
                value={data.age || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  name="sex"
                  value={data.sex || ""}
                  onChange={handleDashboardChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="height"
                label="Height (cm)"
                type="number"
                fullWidth
                value={data.height || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="weight"
                label="Weight (Kg)"
                type="number"
                fullWidth
                value={data.weight || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Diet Type</InputLabel>
                <Select
                  name="diet"
                  value={data.diet || ""}
                  onChange={handleDashboardChange}
                >
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Exercise</InputLabel>
                <Select
                  name="exercise"
                  value={data.exercise || ""}
                  onChange={handleDashboardChange}
                >
                  <MenuItem value="Yoga">Yoga</MenuItem>
                  <MenuItem value="Mild Exercises">
                    Mild Exercises - Walks, Jogs
                  </MenuItem>
                  <MenuItem value="Heavy Exercises">
                    Heavy Exercises - Running, Lifting
                  </MenuItem>
                  <MenuItem value="No">No Exercise</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>

          <div className="flex justify-center mt-6">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
