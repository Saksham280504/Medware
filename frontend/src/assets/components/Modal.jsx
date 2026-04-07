import { useGlobalContext } from "./context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ModalImg from "../img/modal.svg";

const Modal = () => {
  const { registrationToggle, loginButtonClicked, responseCall } =
    useGlobalContext();

  if (!loginButtonClicked) return null;

  return (
    <>
      {/* Loading Animation */}
      {responseCall && (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-black/40 z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full h-16 w-16 border-4 border-cyan-600 border-t-transparent animate-spin"></div>
            <div className="w-24 h-2 bg-cyan-600 rounded-lg animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40 z-40 p-4">
        <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative max-h-[95vh] overflow-y-auto">

          {/* Side Illustration (Desktop only) */}
          <figure className="hidden xl:flex w-1/3 flex-shrink-0 mr-8 items-center justify-center">
            <img
              src={ModalImg}
              alt="Modal Illustration"
              className="w-full h-auto"
            />
          </figure>

          {/* Form */}
          <div className="w-full xl:w-2/3">
            {registrationToggle ? <RegisterForm /> : <LoginForm />}
          </div>

        </div>
      </div>
    </>
  );
};

export default Modal;
