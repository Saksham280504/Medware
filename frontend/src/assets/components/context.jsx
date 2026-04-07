import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

const GlobalContext = React.createContext();

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const AppProvider = ({ children }) => {
  const options = [
    "Itching", "Skin rash", "Shivering", "Chills", "Joint pain",
    "Stomach pain", "Acidity", "Ulcers on tongue", "Muscle wasting",
    "Vomiting", "Burning micturition", "Spotting urination",
    "Fatigue", "Weight gain", "Anxiety", "Cold hands and feets",
    "Mood swings", "Weight loss", "Restlessness", "Lethargy",
    "Patches in throat", "Irregular sugar level", "Cough",
    "High fever", "Sunken eyes", "Breathlessness", "Sweating",
    "Dehydration", "Indigestion", "Headache", "Yellowish skin",
    "Dark urine", "Nausea", "Loss of appetite",
    "Pain behind the eyes", "Back pain", "Constipation",
    "Abdominal pain", "Diarrhea", "Mild fever", "Yellow urine",
    "Yellowing of eyes", "Acute liver failure", "Fluid overload",
    "Swelling of stomach", "Swelled lymph nodes", "Malaise",
    "Blurred and distorted vision", "Phlegm", "Throat irritation",
    "Redness of eyes", "Sinus pressure", "Runny nose",
    "Congestion", "Chest pain", "Weakness in limbs",
    "Fast heart rate", "Pain during bowel movements",
    "Pain in anal region", "Bloody stool", "Irritation in anus",
    "Neck pain", "Dizziness", "Cramps", "Bruising",
    "Obesity", "Swollen legs", "Swollen blood vessels",
    "Puffy face and eyes", "Enlarged thyroid", "Brittle nails",
    "Swollen extremeties", "Excessive hunger",
    "Extra-marital contacts", "Drying and tingling lips",
    "Slurred speech", "Knee pain", "Hip joint pain",
    "Muscle weakness", "Stiff neck", "Swelling joints",
    "Movement stiffness", "Spinning movements",
    "Loss of balance", "Unsteadiness",
    "Weakness of one body side", "Loss of smell",
    "Bladder discomfort", "Foul smell of urine",
    "Continuous feel of urine", "Passage of gases",
    "Internal itching", "Toxic look", "Depression",
    "Irritability", "Muscle pain", "Altered sensorium",
    "Red spots over body", "Belly pain",
    "Abnormal menstruation", "Dischromic patches",
    "Watering from eyes", "Increased appetite",
    "Polyuria", "Family history", "Mucoid sputum",
    "Rusty sputum", "Lack of concentration",
    "Visual disturbances", "Receiving blood transfusion",
    "Receiving unsterile injections", "Coma",
    "Stomach bleeding", "Distention of abdomen",
    "History of alcohol consumption", "Blood in sputum",
    "Prominent veins on calf", "Palpitations",
    "Painful walking", "Pus-filled pimples",
    "Blackheads", "Scarring", "Skin peeling",
    "Silver-like dusting", "Small dents in nails",
    "Inflammatory nails", "Blister",
    "Red sore around nose", "Yellow crust oozing"
  ];

  const [currentUser, setCurrentUser] = useState(null);
  const [responseCall, setResponseCall] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  const email = useRef("");
  const username = useRef("");
  const password = useRef("");
  const error = useRef("");

  const [age, setAge] = useState("");
  const [medicalhistory, setMedicalHistory] = useState([]);
  const [sex, setSex] = useState("");

  const url = `${API_BASE_URL}/patient`;

  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    bp_log: { date: [], high: [], low: [] },
    blood_glucose: { date: [], before: [], after: [] },
  });

  useEffect(() => {
    // Only check session if user previously logged in
    const hasSession = localStorage.getItem("userSession");

    if (hasSession) {
      client.get("/user/")
        .then(() => setCurrentUser(true))
        .catch(() => {
          setCurrentUser(false);
          localStorage.removeItem("userSession");
        });
    }
  }, []);

  function update_form_btn() {
    setRegistrationToggle(!registrationToggle);
    setLoginButtonClicked(true);
  }

  function closeModal() {
    setLoginButtonClicked(false);
  }

  function submitRegistration(e) {
    e.preventDefault();
    setResponseCall(true);

    client.post("/register/", {
      email: email.current,
      username: username.current,
      password: password.current,
    })
    .then(() => {
      return client.post("/login/", {
        email: email.current,
        password: password.current,
      });
    })
    .then(() => {
      localStorage.setItem("userSession", "true");
      setCurrentUser(true);
      setResponseCall(false);
      closeModal();
    })
    .catch((err) => {
      console.log(err);
      setResponseCall(false);
    });
  }

  async function submitLogin(e) {
    e.preventDefault();
    setResponseCall(true);

    try {
      const response = await client.post("/login/", {
        email: email.current,
        password: password.current,
      });

      console.log("Login successful, response:", response.data);
      console.log("Cookies:", document.cookie);

      localStorage.setItem("userSession", "true");
      setCurrentUser(true);
      error.current = "";
      closeModal();
    } catch(err) {
        console.error("Login failed:", err);
        error.current = "Wrong email or password.";
    } finally {
      setResponseCall(false);
    }
  }

  function submitLogout() {
    client.post("/logout/")
      .then(() => {
        localStorage.removeItem("userSession");
        setCurrentUser(false);
      });
  }

  function openRegister() {
    setRegistrationToggle(true);
    setLoginButtonClicked(true);
  }

  function openLogin() {
    setRegistrationToggle(false);
    setLoginButtonClicked(true);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setResponseCall(true);
      await client.put("/patient/", formData);
      setResponseCall(false);
      fetchData();
    } catch (error) {
      console.log(error);
      setResponseCall(false);
    }
  };

  const submitRegistration_with_cleanup = async (e) => {
    await submitRegistration(e);
    email.current = "";
    username.current = "";
    password.current = "";
  };

  const submitLogin_with_cleanup = async (e) => {
    await submitLogin(e);
    email.current = "";
    password.current = "";
  };

  return (
    <GlobalContext.Provider
      value={{
        update_form_btn,
        submitRegistration: submitRegistration,
        submitLogin: submitLogin_with_cleanup,
        submitLogout,
        currentUser,
        registrationToggle,
        setRegistrationToggle,
        email,
        username,
        password,
        age,
        setAge,
        medicalhistory,
        setMedicalHistory,
        sex,
        setSex,
        loginButtonClicked,
        setLoginButtonClicked,
        closeModal,
        options,
        formData,
        setFormData,
        data,
        setData,
        fetchData,
        handleInputChange,
        handleFormSubmit,
        error,
        responseCall,
        redirectTo,
        setRedirectTo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, AppProvider };
