import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "./context";

const SignIn = () => {
  const {
    email,
    username,
    password,
    submitLogin,
    submitRegistration,
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
        `http://127.0.0.1:8000/check_email?email=${decoded.email}`
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
    <div className="flex justify-center items-center min-h-[200px]">
      <div id="signInDiv"></div>
    </div>
  );
};

export default SignIn;
