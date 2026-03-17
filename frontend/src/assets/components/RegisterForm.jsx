import { useGlobalContext } from "./context";
import { TextField, Button } from "@mui/material";
import cancelIcon from "../img/cross icon.svg";
import { useState } from "react";
import SignIn from "./SignIn";

const RegisterForm = () => {
  const {
    submitRegistration,
    email,
    username,
    password,
    closeModal,
  } = useGlobalContext();

  const [user_email, setUserEmail] = useState("");
  const [user_username, setUserUsername] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [emailExists, setEmailExists] = useState("");

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
        `http://127.0.0.1:8000/check_email?email=${user_email}`
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
    <div>
      {/* Close Button */}
      <div className="flex justify-end mb-2 mr-2">
        <button onClick={closeModal}>
          <img src={cancelIcon} alt="close" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-3xl font-semibold text-center">
            Sign Up Now!
          </h2>
          <p className="text-center text-gray-600">
            Access personalized healthcare services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <TextField
            label="Email"
            variant="outlined"
            value={user_email}
            onChange={(event) => {
              setUserEmail(event.target.value);
              setEmailExists("");
              email.current = event.target.value;
            }}
            color="success"
            required
            fullWidth
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
            color="success"
            required
            fullWidth
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
          />

          {!isPasswordValid(user_password) && user_password !== "" && (
            <p className="text-sm text-gray-600">
              Password must be at least 8 characters long and contain:
              <br />• 1 letter
              <br />• 1 digit
              <br />• 1 special character
            </p>
          )}

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>

          <SignIn />

        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
