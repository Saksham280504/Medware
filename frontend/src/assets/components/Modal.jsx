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
            <div className="rounded-full h-16 w-16 border-4 border-teal-600 border-t-transparent animate-spin"></div>
            <div className="w-24 h-2 bg-teal-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/40 z-40">
        <div className="flex justify-center items-center w-80 sm:w-96 bg-white rounded-xl shadow-lg p-6 relative">
          
          {/* Side Illustration (Desktop only) */}
          <figure className="hidden xl:block w-80 mr-6">
            <img
              src={ModalImg}
              alt="Modal Illustration"
              className="w-full"
            />
          </figure>

          {/* Form */}
          <div className="w-full">
            {registrationToggle ? <RegisterForm /> : <LoginForm />}
          </div>

        </div>
      </div>
    </>
  );
};

export default Modal;
