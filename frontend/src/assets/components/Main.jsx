import Modal from "./Modal";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";

const Main = () => (
  <main className="flex flex-col w-full">
    <Hero />
    <Services />
    <About />
    <Modal />
  </main>
);

export default Main;
