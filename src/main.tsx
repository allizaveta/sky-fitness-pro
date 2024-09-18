import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthorizationProvider } from "./context/AuthorizationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthorizationProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </AuthorizationProvider>
);
