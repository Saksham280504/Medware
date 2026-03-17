import { Button } from "@mui/material";
import servicesImg from "../img/services-img.svg";
import diseasePredImg from "../img/diseasepredictor.svg";
import { useGlobalContext } from "./context";

const Services = () => {
  const { setLoginButtonClicked } = useGlobalContext();

  return (
    <>
      {/* ---------- Services Section ---------- */}
      <div
        id="services"
        className="w-full flex flex-col items-center py-20"
      >
        <div className="services-container flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-6xl">

          {/* Image */}
          <div className="w-96 lg:w-1/2 flex justify-center pt-6">
            <img
              src={servicesImg}
              alt="Healthcare services"
              className="block w-full"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
            <div className="text-3xl lg:text-5xl font-semibold mb-4">
              Access Quality Healthcare Assistance Anytime, Anywhere
            </div>

            <div className="text-lg text-gray-600">
              Medware provides you with your go-to healthcare services
              directly from the ease of your device — from any location.
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Disease Predictor Section ---------- */}
      <div className="disease-predictor flex flex-col md:flex-row items-center justify-center py-20 bg-gray-50">

        {/* Image */}
        <div className="w-screen sm:w-4/5 md:w-1/2 flex justify-center">
          <img
            src={diseasePredImg}
            alt="Disease predictor"
            className="block w-full"
          />
        </div>

        {/* Text + Buttons */}
        <div className="w-4/5 md:w-1/2 mt-10 md:mt-0">
          <div className="flex flex-col justify-center md:pl-10">

            <div className="text-3xl lg:text-6xl font-semibold mb-6">
              Feeling low?
            </div>

            <div className="text-lg lg:text-xl text-gray-600 mb-8">
              Use our built-in Disease Predictor and get recommendations
              for medical assistance based on your symptoms.
            </div>

            <div className="flex flex-col sm:flex-row gap-4">

              <Button
                variant="outlined"
                color="secondary"
                className="hover:scale-105 transition md:w-60 md:h-14"
                onClick={() => setLoginButtonClicked(true)}
              >
                Disease Predictor
              </Button>

              <Button
                variant="outlined"
                color="primary"
                className="hover:scale-105 transition md:w-60 md:h-14"
                onClick={() => setLoginButtonClicked(true)}
              >
                Contact Doctor
              </Button>

            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Services;
