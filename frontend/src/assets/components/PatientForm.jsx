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
    <div className="my-8 flex flex-col items-center animate-fade-in-down" style={{animationDelay: "0.1s"}}>
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4 text-center">
        Empowering Your Health Journey
      </h2>
      <p className="text-slate-600 text-lg text-center max-w-2xl mb-12">
        Complete your health profile to get personalized health insights and recommendations
      </p>

      <Container maxWidth="md">
        <form onSubmit={handleFormSubmit}>
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-10 md:p-12 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
            <Grid container spacing={4}>

              {/* Age */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="age"
                  label="Age"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={profileData.age}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.15)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.2)",
                      }
                    }
                  }}
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
                    sx={{
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    }}
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
                  variant="outlined"
                  value={profileData.first_name}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.15)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.2)",
                      }
                    }
                  }}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="last_name"
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  value={profileData.last_name}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.15)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.2)",
                      }
                    }
                  }}
                />
              </Grid>

              {/* DOB */}
              <Grid item xs={12}>
                <InputLabel sx={{ fontSize: "1rem", pl: 1, fontWeight: "600", color: "#1f2937" }}>
                  📅 Date of Birth
                </InputLabel>
                <Divider sx={{ my: 2, borderColor: "rgba(8, 145, 178, 0.2)" }} />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="dob_day"
                  label="Day"
                  fullWidth
                  variant="outlined"
                  value={profileData.dob_day}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="dob_month"
                  label="Month"
                  fullWidth
                  variant="outlined"
                  value={profileData.dob_month}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  name="dob_year"
                  label="Year"
                  fullWidth
                  variant="outlined"
                  value={profileData.dob_year}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    }
                  }}
                />
              </Grid>

              {/* Height */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="height"
                  label="Height (cm)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={profileData.height}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.15)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.2)",
                      }
                    }
                  }}
                />
              </Grid>

              {/* Weight */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="weight"
                  label="Weight (kg)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={profileData.weight}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.15)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.2)",
                      }
                    }
                  }}
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
                  variant="outlined"
                  value={profileData.current_med}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.15)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.2)",
                      }
                    }
                  }}
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
                  variant="outlined"
                  value={profileData.medical_history}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.15)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 4px 12px rgba(8, 145, 178, 0.2)",
                      }
                    }
                  }}
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
                    sx={{
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    }}
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
                    sx={{
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    }}
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
                    sx={{
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    }}
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
                    sx={{
                      borderRadius: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "white",
                      }
                    }}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Mild">Mild</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(90deg, #0891b2, #0e7490)',
                  color: 'white',
                  padding: '12px 48px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textTransform: 'none',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 25px rgba(8, 145, 178, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #0e7490, #0891b2)',
                    boxShadow: '0 15px 35px rgba(8, 145, 178, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  }
                }}
              >
                ✓ Complete Profile
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
            
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
            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  background: 'linear-gradient(90deg, #0891b2, #0e7490)',
                  color: 'white',
                  padding: '12px 48px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  textTransform: 'none',
                  borderRadius: '0.75rem',
                  boxShadow: '0 10px 25px rgba(8, 145, 178, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #0e7490, #0891b2)',
                    boxShadow: '0 15px 35px rgba(8, 145, 178, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  }
                }}
              >
                ✓ Complete Profile
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default PatientForm;
