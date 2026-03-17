import React from "react";
import { useGlobalContext } from "./context";
import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
  const { submitLogout, update_form_btn, currentUser } =
    useGlobalContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    submitLogout();
    navigate("/");
  };

  if (currentUser) {
    return (
      <button
        onClick={handleLogout}
        className="px-3 py-1 rounded-md text-red-600 border border-red-600 hover:bg-red-50 transition"
      >
        Log out
      </button>
    );
  }

  return (
    <button
      id="form_btn"
      onClick={update_form_btn}
      className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition"
    >
      Register / Login
    </button>
  );
};

export default LoginBtn;
