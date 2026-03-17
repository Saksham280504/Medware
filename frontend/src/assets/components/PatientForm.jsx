import React from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  InputLabel,
  Divider,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const PatientForm = ({
  profileData,
  handleInputChange,
  handleFormSubmit,
  patientData,
}) => {
  if (!patientData?.new_patient) return null;

  return (
    <div className="my-8 flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Empowering Your Health Journey
      </h2>

      <Container maxWidth="md">
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            
            {/* Age */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="age"
                label="Age"
                type="number"
                fullWidth
                value={profileData.age}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Sex */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select
                  labelId="sex-label"
                  name="sex"
                  value={profileData.sex}
                  label="Sex"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="first_name"
                label="First Name"
                fullWidth
                value={profileData.first_name}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="last_name"
                label="Last Name"
                fullWidth
                value={profileData.last_name}
                onChange={handleInputChange}
              />
            </Grid>

            {/* DOB */}
            <Grid item xs={12}>
              <InputLabel sx={{ fontSize: "1rem", pl: 1 }}>
                Date of Birth
              </InputLabel>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="dob_day"
                label="Day"
                fullWidth
                value={profileData.dob_day}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="dob_month"
                label="Month"
                fullWidth
                value={profileData.dob_month}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="dob_year"
                label="Year"
                fullWidth
                value={profileData.dob_year}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Height */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="height"
                label="Height (cm)"
                type="number"
                fullWidth
                value={profileData.height}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Weight */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="weight"
                label="Weight (kg)"
                type="number"
                fullWidth
                value={profileData.weight}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Current Medications */}
            <Grid item xs={12}>
              <TextField
                name="current_med"
                label="Current Medications (comma separated)"
                multiline
                rows={3}
                fullWidth
                value={profileData.current_med}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Medical History */}
            <Grid item xs={12}>
              <TextField
                name="medical_history"
                label="Medical History (comma separated)"
                multiline
                rows={3}
                fullWidth
                value={profileData.medical_history}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Exercise */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="exercise-label">Exercise</InputLabel>
                <Select
                  labelId="exercise-label"
                  name="exercise"
                  value={profileData.exercise}
                  label="Exercise"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Yoga">Yoga</MenuItem>
                  <MenuItem value="Mild">
                    Mild – Walks, Jogs
                  </MenuItem>
                  <MenuItem value="Heavy">
                    Heavy – Running, Lifting
                  </MenuItem>
                  <MenuItem value="No">No Exercise</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Diet */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="diet-label">Diet</InputLabel>
                <Select
                  labelId="diet-label"
                  name="diet"
                  value={profileData.diet}
                  label="Diet"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Non-Vegetarian">
                    Non-Vegetarian
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Alcohol */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="alcohol-label">
                  Alcohol Consumption
                </InputLabel>
                <Select
                  labelId="alcohol-label"
                  name="alcohol_cons"
                  value={profileData.alcohol_cons}
                  label="Alcohol Consumption"
                  onChange={handleInputChange}
                >
                  <MenuItem value="No">No</MenuItem>
                  <MenuItem value="Mild">Mild</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Smoking */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="smoke-label">
                  Smoking Consumption
                </InputLabel>
                <Select
                  labelId="smoke-label"
                  name="smoke_cons"
                  value={profileData.smoke_cons}
                  label="Smoking Consumption"
                  onChange={handleInputChange}
                >
                  <MenuItem value="No">No</MenuItem>
                  <MenuItem value="Mild">Mild</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default PatientForm;
