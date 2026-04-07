import { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SymptomSearch from "./searchSymptoms";
import { useGlobalContext } from "./context";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";
import Prediction from "./Prediction";
import dpImg from "../img/dp-image.svg";
import API_BASE_URL from "../../config";

const DpWindow = () => {
  const { options } = useGlobalContext();

  const index = useRef(null);
  const allSymptomsString = useRef("");

  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [copySymptoms, setCopySymptoms] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState(
    Array(options.length).fill("0")
  );
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const isDuplicate = (symptom) => symptoms.includes(symptom);

  const handleAddSymptom = () => {
    if (selectedSymptom && !isDuplicate(selectedSymptom)) {
      const symptomIndex = options.indexOf(selectedSymptom);
      index.current = symptomIndex;

      addSymptom(selectedSymptom);

      setAllSymptoms((prev) => {
        const updated = [...prev];
        updated[symptomIndex] = "1";
        return updated;
      });

      setSelectedSymptom(null);
    } else if (isDuplicate(selectedSymptom)) {
      alert("This symptom has already been added!");
    } else {
      alert("Choose a valid symptom");
    }
  };

  const handleClick = () => {
    if (symptoms.length !== 0) {
      setCopySymptoms([...allSymptoms]);
    }
  };

  const clearSymptoms = () => {
    setSymptoms([]);
    setAllSymptoms(Array(options.length).fill("0"));
    setPrediction(null);
  };

  const addSymptom = (symptom) => {
    if (!symptom) return;
    if (!isDuplicate(symptom)) {
      setSymptoms((prev) => [...prev, symptom]);
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms((prev) => prev.filter((s) => s !== symptom));

    const symptomIndex = options.indexOf(symptom);

    setAllSymptoms((prev) => {
      const updated = [...prev];
      updated[symptomIndex] = "0";
      return updated;
    });

    if (symptoms.length === 1) {
      setPrediction(null);
    }
  };

  useEffect(() => {
    if (copySymptoms.length === 0) return;

    allSymptomsString.current = copySymptoms.join("");

    axios
      .get(`${API_BASE_URL}/prediction/${allSymptomsString.current}`, {
        withCredentials: true
      })
      .then((response) => {
        if (symptoms.length !== 0) {
          setPrediction(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [copySymptoms]);

  return (
    <div className="dpWindow w-full flex flex-col items-center py-6 md:py-8 px-6 md:px-8">
      {/* Main Container */}
      <div className="w-full max-w-6xl">

        {/* Add Symptoms Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Disease Predictor
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Enter your symptoms to get potential disease predictions
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border border-blue-200 p-6 md:p-8 shadow-sm mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
              Add Symptoms
            </h3>
            <div className="bttns-container">
              <SymptomSearch
                handleAddSymptom={handleAddSymptom}
                selectedSymptom={selectedSymptom}
                setSelectedSymptom={setSelectedSymptom}
              />
            </div>
          </div>

          {/* Symptoms Display Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Your Symptoms */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
                  Your Symptoms
                </h3>

                <div className="flex flex-wrap gap-3 bg-slate-50 rounded-lg p-4 min-h-20 items-start">
                  {symptoms.length === 0 ? (
                    <div className="text-slate-500 italic py-2">
                      No symptoms added yet. Use the search above to add symptoms.
                    </div>
                  ) : (
                    symptoms.map((symptom) => (
                      <div
                        key={symptom}
                        className="added-symptom flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-900 font-medium shadow-sm hover:shadow-md transition"
                      >
                        <span>{symptom}</span>
                        <button
                          onClick={() => removeSymptom(symptom)}
                          className="hover:text-cyan-700 transition"
                        >
                          <img src={cancelIcon} alt="remove" className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Action Buttons */}
                <div className="btn-container flex gap-3 mt-6">
                  <Button
                    variant="contained"
                    onClick={handleClick}
                    disabled={symptoms.length === 0}
                    sx={{
                      backgroundColor: '#0891b2',
                      color: 'white',
                      padding: '10px 24px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      textTransform: 'none',
                      flex: 1,
                      '&:hover': {
                        backgroundColor: '#0e7490',
                      },
                      '&:disabled': {
                        backgroundColor: '#cbd5e1',
                        color: '#94a3b8',
                      }
                    }}
                  >
                    Get Prediction
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={clearSymptoms}
                    disabled={symptoms.length === 0}
                    sx={{
                      borderColor: '#e11d48',
                      color: '#e11d48',
                      padding: '10px 24px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      textTransform: 'none',
                      flex: 1,
                      '&:hover': {
                        backgroundColor: '#ffe4e6',
                        borderColor: '#be185d',
                      },
                      '&:disabled': {
                        borderColor: '#cbd5e1',
                        color: '#cbd5e1',
                      }
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Prediction */}
            <div>
              <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8 shadow-sm sticky top-4">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
                  Prediction Results
                </h3>

                {prediction ? (
                  <Prediction prediction={prediction} />
                ) : (
                  <div className="w-full bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-6 text-center border border-blue-200">
                    <p className="text-slate-600 text-sm font-medium">
                      Add symptoms and click "Get Prediction" to see results
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* About Section */}
        <section className="mt-12 pt-8 border-t border-slate-200">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  About Our Disease Predictor
                </h2>

                <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
                  Our advanced disease predictor is a powerful tool designed to simplify healthcare.
                </p>

                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  Built on cutting-edge machine learning and trained on extensive medical data, our predictor provides accurate disease analysis. With an intuitive interface and easy-to-understand results, you can gain valuable insights into potential conditions and take proactive measures for your well-being.
                </p>
              </div>

              {/* Image */}
              <div className="flex items-center justify-center">
                <img src={dpImg} alt="Disease Predictor Illustration" className="w-full max-w-sm drop-shadow-lg" />
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DpWindow;
