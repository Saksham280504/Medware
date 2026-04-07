import { Button } from "@mui/material";
import servicesImg from "../img/services-img.svg";
import diseasePredImg from "../img/diseasepredictor.svg";
import { useGlobalContext } from "./context";

const Services = () => {
  const { setLoginButtonClicked, setRegistrationToggle, setRedirectTo } = useGlobalContext();

  const handleDiseasePredictor = () => {
    setRedirectTo("/predictor");
    setRegistrationToggle(false);
    setLoginButtonClicked(true);
  };

  const handleContactDoctor = () => {
    setRedirectTo("/contactdoctor");
    setRegistrationToggle(false);
    setLoginButtonClicked(true);
  };

  return (
    <>
      {/* ---------- Services Section Heading ---------- */}
      <div className="w-full flex justify-center py-12 bg-white border-t border-slate-200">
        <div className="section-heading">
          Our Healthcare Services
        </div>
      </div>

      {/* ---------- Services Section ---------- */}
      <div
        id="services"
        className="w-full flex flex-col items-center py-28 md:py-36 bg-white px-6 md:px-12"
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
      <div className="disease-predictor flex flex-col md:flex-row items-center justify-center py-28 md:py-36 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">

        {/* Image */}
        <div className="w-80 sm:w-96 md:w-1/2 flex justify-center order-2 md:order-1">
          <img
            src={diseasePredImg}
            alt="Disease predictor"
            className="block w-full max-w-xs md:max-w-md shadow-lg"
          />
        </div>

        {/* Text + Buttons */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 order-1 md:order-2 md:pl-10">
          <div className="flex flex-col justify-center">

            <div className="text-3xl lg:text-5xl font-bold mb-3 text-slate-900">
              Feeling low?
            </div>

            <div className="text-lg text-slate-600 mb-8">
              Use our built-in Disease Predictor and get recommendations
              for medical assistance based on your symptoms.
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">

              <Button
                variant="contained"
                color="info"
                className="hover:scale-105 transition flex-1 sm:flex-none font-semibold px-8 py-3 shadow-lg"
                onClick={handleDiseasePredictor}
              >
                Disease Predictor
              </Button>

              <Button
                variant="outlined"
                className="hover:scale-105 transition flex-1 sm:flex-none border-2 border-cyan-600 text-cyan-600 font-semibold px-8 py-3 hover:bg-cyan-50"
                onClick={handleContactDoctor}
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
