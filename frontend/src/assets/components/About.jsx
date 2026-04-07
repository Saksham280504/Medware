import patternImg from "../img/pattern.svg";

const About = () => {
  return (
    <div
      id="about"
      className="w-full flex justify-center py-28 md:py-36 px-6 md:px-12 bg-slate-50"
    >
      <div className="flex flex-col items-center w-full max-w-6xl">

        {/* Section Heading */}
        <div className="section-heading mb-16">
          About Medware
        </div>

        <div className="about-container flex flex-col-reverse md:flex-row items-center w-full gap-12 md:gap-16">

          {/* Text Section */}
          <div className="hero flex flex-col justify-center md:w-2/3 space-y-6 accent-border-left">

            <div className="hero-stanza text-slate-600 text-base md:text-lg leading-relaxed text-center md:text-left">
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
              className="block w-full h-auto shadow-lg"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
