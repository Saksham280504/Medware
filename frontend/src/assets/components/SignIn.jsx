import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "./context";
import API_BASE_URL from "../../config";

const SignIn = () => {
  const {
    email,
    username,
    password,
    submitLogin,
    submitRegistration,
    registrationToggle,
    setRegistrationToggle,
  } = useGlobalContext();

  const userObject = useRef(null);

  const handleCallback = async (response) => {
    try {
      // Decode Google credential
      const decoded = jwtDecode(response.credential);
      userObject.current = decoded;

      // Populate context refs
      username.current = decoded.name;
      email.current = decoded.email;
      password.current = response.credential.slice(0, 12);

      // Check if email exists in backend
      const fetchResponse = await fetch(
        `${API_BASE_URL}/check_email?email=${decoded.email}`
      );

      const data = await fetchResponse.json();

      if (data.email_exists) {
        submitLogin();
      } else {
        submitRegistration();
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleCallback,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
          width: 250,
        }
      );
    };

    initializeGoogleSignIn();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setRegistrationToggle(!registrationToggle)}
        className="text-sm text-slate-600 hover:text-cyan-600 transition underline"
      >
        {registrationToggle ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
      </button>

      {/* Divider */}
      <div className="w-full flex items-center gap-2">
        <div className="flex-1 border-t border-slate-200"></div>
        <span className="text-xs text-slate-500">or</span>
        <div className="flex-1 border-t border-slate-200"></div>
      </div>

      {/* Google Sign-In */}
      <div id="signInDiv" className="flex justify-center"></div>
    </div>
  );
};

export default SignIn;
