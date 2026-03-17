import { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SymptomSearch from "./searchSymptoms";
import { useGlobalContext } from "./context";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";
import Prediction from "./Prediction";
import dpImg from "../img/dp-image.svg";

const DpWindow = () => {
  const { options } = useGlobalContext();

  const index = useRef(null);
  const allSymptomsString = useRef("");

  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [copySymptoms, setCopySymptoms] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState(
    Array(options.length + 1).fill("0")
  );
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const isDuplicate = (symptom) => symptoms.includes(symptom);

  const handleAddSymptom = () => {
    if (selectedSymptom && !isDuplicate(selectedSymptom)) {
      const symptomIndex = options.indexOf(selectedSymptom) + 1;
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
    setAllSymptoms(Array(options.length + 1).fill("0"));
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

    const symptomIndex = options.indexOf(symptom) + 1;

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
      .get(`http://127.0.0.1:8000/prediction/${allSymptomsString.current}`)
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
    <div className="dpWindow w-full flex items-center flex-col">
      <div className="bttns-container flex w-2/3 xl:w-1/2 justify-center">
        <SymptomSearch
          handleAddSymptom={handleAddSymptom}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
        />
      </div>

      <div className="symptoms w-5/6 flex justify-center gap-10 mt-6">
        <div className="w-full md:w-4/5 lg:w-1/2 overflow-y-scroll">
          <div className="w-full h-full flex flex-col justify-between">
            <h2 className="w-full text-xl lg:text-2xl xl:text-3xl">
              Your Symptoms
            </h2>

            <div className="flex flex-wrap bg-green-50 w-full mt-4 p-2 rounded">
              {symptoms.length === 0 ? (
                <div className="text-gray-500 italic">
                  Add your first symptom
                </div>
              ) : (
                symptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="added-symptom p-2 m-1.5 flex items-center rounded bg-white shadow"
                  >
                    <div className="mr-2">{symptom}</div>
                    <button onClick={() => removeSymptom(symptom)}>
                      <img src={cancelIcon} alt="remove" className="h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="btn-container w-full flex gap-2 px-2 mt-4">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClick}
                className="w-1/2 md:w-1/3 h-11"
              >
                Predict
              </Button>

              <Button
                variant="outlined"
                color="error"
                className="w-1/2 md:w-1/3 h-11"
                onClick={clearSymptoms}
              >
                Clear Symptoms
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/5 lg:w-1/3 p-2 flex flex-col">
          <h2 className="text-xl lg:text-2xl xl:text-3xl">Prediction</h2>

          {prediction ? (
            <Prediction prediction={prediction} />
          ) : (
            <div className="w-full h-full bg-sky-50 mt-2 rounded p-4">
              No prediction
            </div>
          )}
        </div>
      </div>

      <section className="w-full flex justify-center sm:px-8 md:px-12 mt-10">
        <div className="hero flex flex-col justify-center sm:w-5/6">
          <div className="hero-text text-3xl lg:text-4xl mb-5">
            About our Disease Predictor
          </div>

          <div className="text-base xl:text-lg">
            Introducing our advanced disease predictor, a powerful tool built
            to simplify healthcare for you. Built upon cutting-edge machine
            learning technology and trained on extensive medical data, this
            predictor provides accurate predictions and analysis of diseases.
            With a user-friendly interface and easy-to-understand results, you
            can gain valuable insights into potential conditions and take
            proactive measures to safeguard your well-being.
          </div>
        </div>

        <div className="img-wrapper w-1/2 flex justify-center">
          <img src={dpImg} alt="hero" className="block w-4/5" />
        </div>
      </section>
    </div>
  );
};

export default DpWindow;
