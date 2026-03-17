import hero_img from "../img/hero-img.svg";
import Button from "@mui/material/Button";
import { useGlobalContext } from "./context";

const Hero = () => {
  const { setLoginButtonClicked, setRegistrationToggle } =
    useGlobalContext();

  return (
    <section className="w-full flex justify-center pt-20 lg:pt-28">
      <div className="w-11/12 lg:w-4/5 flex flex-col-reverse lg:flex-row items-center gap-10">

        {/* Left Content */}
        <div className="flex flex-col text-center lg:text-left max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Your Healthcare, Simplified
          </h1>

          <p className="text-lg text-white mb-8">
            Experience optimal health with simplified solutions.
            Monitor, consult, and manage your wellness — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Button
              variant="contained"
              color="primary"
              className="hover:scale-105 transition-transform"
              onClick={() => {
                setRegistrationToggle(true);
                setLoginButtonClicked(true);
              }}
            >
              Join Us
            </Button>

            <Button
              variant="outlined"
              color="success"
              className="hover:scale-105 transition-transform"
              onClick={() => {
                setLoginButtonClicked(true);
                setRegistrationToggle(false);
              }}
            >
              Already a member?
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-80 sm:w-96 lg:w-1/2 flex justify-center">
          <img
            src={hero_img}
            alt="Healthcare Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
