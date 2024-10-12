import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Instalando el Service worker");
      } else if (registration.waiting) {
        console.log("Service worker instalado");
      } else if (registration.active) {
        console.log("Service worker activo");
      }
    } catch (error) {
      console.error(`Falló el registro con el ${error}`);
    }
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

registerServiceWorker();

