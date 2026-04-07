import { useGlobalContext } from "./context";
import { TextField, Button } from "@mui/material";
import cancelIcon from "../img/cross icon.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import API_BASE_URL from "../../config";

const RegisterForm = () => {
  const {
    submitRegistration,
    email,
    username,
    password,
    closeModal,
    currentUser,
    redirectTo,
  } = useGlobalContext();
  const navigate = useNavigate();

  const [user_email, setUserEmail] = useState("");
  const [user_username, setUserUsername] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [emailExists, setEmailExists] = useState("");

  // Auto-close modal and navigate after successful registration
  useEffect(() => {
    if (currentUser === true) {
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate("/");
      }
    }
  }, [currentUser, redirectTo, navigate]);

  // Strong password regex
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const isPasswordValid = (password) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isPasswordValid(user_password)) return;

    try {
      const fetchResponse = await fetch(
        `${API_BASE_URL}/check_email?email=${user_email}`
      );

      const data = await fetchResponse.json();

      if (data.email_exists) {
        setEmailExists("Email already exists");
      } else {
        submitRegistration(event);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition">
          <img src={cancelIcon} alt="close" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-2 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900">
            Create Account
          </h2>
          <p className="text-center text-slate-600 text-sm md:text-base">
            Join Medware for personalized healthcare
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <TextField
            label="Email"
            variant="outlined"
            value={user_email}
            onChange={(event) => {
              setUserEmail(event.target.value);
              setEmailExists("");
              email.current = event.target.value;
            }}
            color="primary"
            required
            fullWidth
            size="small"
          />

          {emailExists && (
            <p className="text-red-500 text-sm text-center">
              {emailExists}
            </p>
          )}

          <TextField
            label="Username"
            variant="outlined"
            value={user_username}
            onChange={(event) => {
              setUserUsername(event.target.value);
              username.current = event.target.value;
            }}
            color="primary"
            required
            fullWidth
            size="small"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={user_password}
            onChange={(event) => {
              setUserPassword(event.target.value);
              password.current = event.target.value;
            }}
            color={
              user_password === ""
                ? "primary"
                : isPasswordValid(user_password)
                ? "success"
                : "error"
            }
            required
            fullWidth
            size="small"
          />

          {!isPasswordValid(user_password) && user_password !== "" && (
            <p className="text-sm text-slate-600">
              Password must be at least 8 characters long and contain:
              <br />• 1 letter
              <br />• 1 digit
              <br />• 1 special character
            </p>
          )}

          <Button
            variant="contained"
            type="submit"
            className="mt-2 font-semibold"
            sx={{
              backgroundColor: '#0891b2',
              color: 'white',
              padding: '10px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              textTransform: 'none',
              width: '100%',
              '&:hover': {
                backgroundColor: '#0e7490',
              }
            }}
          >
            Create Account
          </Button>

          <SignIn />

        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
