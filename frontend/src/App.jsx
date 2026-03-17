import "./App.css";
import Header from "./assets/components/Header";
import Main from "./assets/components/Main";
import Prediction from "./assets/components/Prediction";
import Footer from "./assets/components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./assets/components/Dashboard";
import ContactDoctor from "./assets/components/ContactDoctor";
import ProtectedRoute from "./assets/components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-16">
      <Routes>
        <Route path="/predictor" element={<Prediction />} />
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          } />
        <Route path="/contactdoctor" element={<ContactDoctor />} />
      </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
