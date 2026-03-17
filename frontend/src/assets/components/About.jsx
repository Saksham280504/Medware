import patternImg from "../img/pattern.svg";

const About = () => {
  return (
    <div
      id="about"
      className="w-full flex justify-center mt-16 px-4"
    >
      <div className="about-container flex flex-col-reverse md:flex-row items-center max-w-6xl w-full gap-10">
        
        {/* Text Section */}
        <div className="hero flex flex-col justify-center md:w-2/3 space-y-6">
          
          <div className="hero-text text-3xl md:text-4xl font-bold text-center md:text-left text-gray-800">
            About Medware
          </div>

          <div className="hero-stanza text-gray-600 text-base md:text-lg leading-relaxed text-center md:text-left">
            Your one-stop healthcare provider. Our innovative medical tools 
            and disease predictor offer personalized insights into your health.
            Convenient doctor consultations and a wide range of healthcare 
            services are just a click away. Experience the perfect blend of 
            compassionate care and advanced technology with Medware.
          </div>

        </div>

        {/* Image Section */}
        <div className="img-wrapper w-72 md:w-1/3 flex justify-center">
          <img
            src={patternImg}
            alt="About Medware"
            className="block w-full h-auto"
          />
        </div>

      </div>
    </div>
  );
};

export default About;
