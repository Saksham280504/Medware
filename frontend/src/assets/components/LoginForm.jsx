import { useGlobalContext } from "./context";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import cancelIcon from "../img/cross icon.svg";
import SignIn from "./SignIn";

const LoginForm = () => {
  const { email, password, submitLogin, closeModal, error } =
    useGlobalContext();

  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await submitLogin(event);

    // Update error display AFTER login attempt
    if (error?.current) {
      setErrorDisplay(error.current);
    }
  };

  return (
    <div>
      {/* Close Button */}
      <div className="flex justify-end mb-3 mr-2">
        <button onClick={closeModal}>
          <img src={cancelIcon} alt="close" />
        </button>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl text-center w-full">
            Hello Again!
          </h2>
          <p className="text-center w-full">
            Welcome back! You've been missed.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4"
        >
          <TextField
            id="FormBasicEmail"
            label="Email"
            variant="outlined"
            value={user_email}
            onChange={(event) => {
              setUserEmail(event.target.value);
              email.current = event.target.value;
            }}
            helperText="We'll never share your email"
            color="success"
            required
            fullWidth
          />

          <TextField
            id="formBasicPassword"
            label="Password"
            type="password"
            variant="outlined"
            value={user_password}
            onChange={(event) => {
              setUserPassword(event.target.value);
              password.current = event.target.value;
            }}
            color="success"
            required
            fullWidth
          />

          <Button
            variant="outlined"
            color="primary"
            type="submit"
          >
            Login
          </Button>

          {errorDisplay && (
            <p className="text-red-500 text-sm">
              {errorDisplay}
            </p>
          )}

          <SignIn />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
