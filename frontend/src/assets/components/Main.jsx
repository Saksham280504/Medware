import Modal from "./Modal";
import { useGlobalContext } from "./context";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import DpWindow from "./dpWindow";

const Main = () => {
  const { currentUser } = useGlobalContext();

  if (!currentUser) {
    return (
      <main className="flex flex-col items-center min-h-screen px-4 py-10">
        <Hero />
        <Services />
        <About />
        <Modal />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen pt-10">
      <DpWindow />
    </main>
  );
};

export default Main;
