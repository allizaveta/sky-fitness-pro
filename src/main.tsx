import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthorizationProvider } from "./context/AuthorizationContext.tsx";
import ReduxProvider from "./store/reduxProvider.tsx";
import { UserProvider } from "./context/userContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider>
    <BrowserRouter>
    <UserProvider>
      <AuthorizationProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AuthorizationProvider>
      </UserProvider>
    </BrowserRouter>
  </ReduxProvider>
);
