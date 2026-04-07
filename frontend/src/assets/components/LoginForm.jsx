import { useGlobalContext } from "./context";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import cancelIcon from "../img/cross icon.svg";
import SignIn from "./SignIn";

const LoginForm = () => {
  const { email, password, submitLogin, closeModal, error, currentUser, redirectTo } =
    useGlobalContext();
  const navigate = useNavigate();

  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("");

  // Auto-close modal and navigate after successful login
  useEffect(() => {
    if (currentUser === true) {
      if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate("/");
      }
    }
  }, [currentUser, redirectTo, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await submitLogin(event);

    // Update error display AFTER login attempt
    if (error?.current) {
      setErrorDisplay(error.current);
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
            Welcome Back
          </h2>
          <p className="text-center text-slate-600 text-sm md:text-base">
            Sign in to your Medware account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-3"
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
            color="primary"
            required
            fullWidth
            size="small"
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
            color="primary"
            required
            fullWidth
            size="small"
          />

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
            Sign In
          </Button>

          {errorDisplay && (
            <p className="text-red-500 text-sm text-center">
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
