import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./assets/components/context.jsx";
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
